import * as Joi from "joi";

/**
 * DTO used for Predict Titanic Disaster
 */
export class PredictDto {
  public passengerClass: number;
  public sex: string;
  public age: number;
  public siblingsAndSpouses: number;
  public parentAndChildren: number;
  public fare: number;
  public embarked: string;
}

/**
 * Joi Schema used to validate predict import
 */
export const PredictSchema = Joi.object({
  passengerClass: Joi.number().required().valid(1,2,3),
  sex: Joi.string().required().valid('M', 'F'),
  age: Joi.number().required().min(0).max(100),
  siblingsAndSpouses: Joi.number().required().min(0).max(20),
  parentAndChildren: Joi.number().required().min(0).max(20),
  fare: Joi.number().required().min(0).max(100),
  embarked: Joi.string().required().valid('C','Q','S'),
}).options({
  abortEarly: false,
})