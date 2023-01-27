import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';
import * as csv from 'csvtojson'
import { PredictResultDto } from './dtos/predict-result.dto';
import { PredictDto } from './dtos/predict.dto';
import { TrainResultDto, TrainResultEntry } from './dtos/train-result.dto';

interface PythoutOutput {
  survived: boolean;
  accuracy: number;
}

interface TrainData {
  PassengerId: string;
  Survived: string;
  Pclass: string;
  Name: string;
  Sex: string;
  Age: string;
  SibSp: string;
  Parch: string;
  Ticket: string;
  Fare: string;
  Cabin: string;
  Embarked: string;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger('AppService');

  async predict(data: PredictDto):Promise<PredictResultDto> {
    return new Promise<PredictResultDto>((resolve, reject) => {
      // predict.py expects this inputs:
      // - passenger class
      // - sex
      // - age
      // - siblings and spuses
      // - parents and children
      // - fare
      // - embarked
      const params = [
        'predict.py',
        data.passengerClass.toString(),
        data.sex,
        data.age.toString(),
        data.siblingsAndSpouses.toString(),
        data.parentAndChildren.toString(),
        data.fare.toString(),
        data.embarked,
      ]
      // execute python script with parameters
      const python = spawn('python3', params, {
        // we need to change script execution directory
        cwd: path.resolve(__dirname, "..", "assets")
      })

      let result = ''
      let error = ''
      python.stdout.on('data', (data) => {
        // append script output
        result += data;
      });
      python.stderr.on('data', (data) => {
        // in case of a not-trapped exception in Python script 
        error += data;
      })
      python.on('close', () => {
        // If exit code != 0 then there was an error
        if (python.exitCode !== 0) {
          this.logger.debug(`Python script failed with exitCode ${python.exitCode}`)
          reject(error)
        } else {
          try {
            this.logger.debug(`Python script result '${result}'`)
    
            const output = JSON.parse(result) as PythoutOutput;
            resolve({
              survived: output.survived,
              accuracy: output.accuracy,
            })
          } catch(err) {
            this.logger.error(`Failed to parse JSON: ${err}`)
            reject('Prediction failed')
          }
        }
      })
      python.on('error', (err) => {
        this.logger.error(`Python script failed with error ${err}`)
        reject(err)
      })
    })
  }

  async getTrainData(): Promise<TrainResultDto> {
    const rows: TrainData[] = await csv().fromFile(path.resolve(__dirname, '..', 'assets', 'train.csv'))
    const entries: TrainResultEntry[] = rows.map((row) => ({
      passengerId: parseInt(row.PassengerId),
      survived: row.Survived === "1",
      pClass: parseInt(row.Pclass),
      name: row.Name,
      sex: row.Sex,
      age: parseFloat(row.Age),
      sibSp: parseInt(row.SibSp),
      parCh: parseInt(row.Parch),
      ticket: row.Ticket,
      fare: parseFloat(row.Fare),
      cabin: row.Cabin,
      embarked: row.Embarked,
    }));
    
    return {
      entries
  }}
}
