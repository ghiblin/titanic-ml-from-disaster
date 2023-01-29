export interface TrainDataEntry {
  passengerId: number;
  survived: boolean;
  pClass: number;
  name: string;
  sex: string;
  age: number;
  sibSp: number;
  parCh: number;
  ticket: string;
  fare: number;
  cabin: string;
  embarked: string;
}

export interface TrainData {
  entries: TrainDataEntry[];
}
