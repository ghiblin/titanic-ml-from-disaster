import { Body, Controller, Get, InternalServerErrorException, Logger, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { PredictResultDto } from './dtos/predict-result.dto';
import { PredictDto, PredictSchema } from './dtos/predict.dto';
import { TrainResultDto } from './dtos/train-result.dto';
import { JoiValidationPipe } from './pipes/joi-validation.pipe';

@Controller()
export class AppController {
  private readonly logger = new Logger("AppController");
  constructor(private readonly appService: AppService) {}

  /**
   * Predict user survival based on ML Titanic Disaster.
   * 
   * @param predictDto Prediction input
   * @returns {Promise<PredictResultDto>}
   */
  @Post("predict")
  @UsePipes(new JoiValidationPipe(PredictSchema))
  async predict(@Body() predictDto: PredictDto): Promise<PredictResultDto> {
    try {
      const result = await this.appService.predict(predictDto);
      return result;
    } catch(err) {
      this.logger.error(`Failed to retrieve prediction: ${err}`)
      throw new InternalServerErrorException(err)
    }
  }

  /**
   * Retrieve train data
   * 
   * @returns {Promise<TrainResultDto>}
   */
  @Get('train-data')
  async getTrainData() {
    const result = await this.appService.getTrainData()
    return result;
  }
}
