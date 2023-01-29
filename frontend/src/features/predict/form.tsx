import React from "react";
import { useEffect } from "react";
import Button from "../../components/button";
import RadioGroup from "../../components/radio-group";
import Range from "../../components/range";
import { PredictDto, Prediction } from "./types";
import { usePredict } from "./usePredict";

const initialData: PredictDto = {
  passengerClass: 1,
  sex: "M",
  age: 18,
  siblingsAndSpouses: 0,
  parentAndChildren: 0,
  fare: 22,
  embarked: "C",
};

type FormProps = {
  onPrediction?: (data: Prediction | undefined) => void;
};

export default function Form({ onPrediction }: FormProps) {
  const [data, setData] = React.useState<PredictDto>(initialData);
  const { predict, isLoading, error } = usePredict({ onSuccess: onPrediction });

  const onChange = (name: keyof PredictDto) => (value: number | string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <form noValidate>
      <RadioGroup
        name="passengerClass"
        label="Passenger Class"
        value={data.passengerClass}
        onChange={onChange("passengerClass")}
        options={[
          { value: 1, label: "First Class" },
          { value: 2, label: "Second Class" },
          { value: 3, label: "Third Class" },
        ]}
      />
      <RadioGroup
        name="sex"
        label="Sex"
        value={data.sex}
        onChange={onChange("sex")}
        options={[
          { value: "M", label: "Male" },
          { value: "F", label: "Female" },
        ]}
      />
      <Range
        name="age"
        label="Age"
        value={data.age}
        min={0}
        max={100}
        onChange={onChange("age")}
      />
      <Range
        name="siblingsAndSpouses"
        label="Siblings & Spouses"
        value={data.siblingsAndSpouses}
        min={0}
        max={20}
        onChange={onChange("siblingsAndSpouses")}
      />
      <Range
        name="parentAndChildren"
        label="Parents & Children"
        value={data.parentAndChildren}
        min={0}
        max={20}
        onChange={onChange("parentAndChildren")}
      />
      <Range
        name="fare"
        label="Fare"
        value={data.fare}
        min={0}
        max={50}
        step={0.05}
        onChange={onChange("fare")}
      />
      <RadioGroup
        name="embarked"
        label="Embarked"
        value={data.embarked}
        onChange={onChange("embarked")}
        options={[
          { value: "C", label: "Cherbourg" },
          { value: "Q", label: "Queenstown" },
          { value: "S", label: "Southampton" },
        ]}
      />
      <Button
        label="Predict"
        onClick={() => {
          predict(data);
        }}
        disabled={isLoading}
      />
      {error ? (
        <div className="bg-red-600 p-4 text-white rounded-lg">
          Ooops, something went wrong!
        </div>
      ) : null}
    </form>
  );
}
