import { useState } from "react";
import Form from "./form";
import PredictionResult from "./prediction-result";
import { Prediction } from "./types";

export default function Predict() {
  const [prediction, setPrediction] = useState<Prediction>();

  return (
    <div className="flex items-center flex-col mx-auto gap-5">
      <Form onPrediction={setPrediction} />
      <PredictionResult prediction={prediction} />
    </div>
  );
}
