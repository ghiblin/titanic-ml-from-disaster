export type Sex = "M" | "F";
export type Embarked = "C" | "Q" | "S";

export interface PredictDto {
  passengerClass: number;
  sex: Sex;
  age: number;
  siblingsAndSpouses: number;
  parentAndChildren: number;
  fare: number;
  embarked: Embarked;
}

export interface Prediction {
  survived: boolean;
  accuracy: number;
}
