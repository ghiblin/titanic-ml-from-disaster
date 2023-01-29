import { useMutation } from "react-query";
import { postPredict } from "./api";
import { Prediction } from "./types";

type UsePredictProps = {
  onSuccess?: (data: Prediction | undefined) => void;
  onError?: (error: unknown) => void;
};

export function usePredict({ onSuccess, onError }: UsePredictProps) {
  const {
    mutate: predict,
    isLoading,
    error,
  } = useMutation(postPredict, {
    onSuccess,
    onError,
  });

  return { predict, isLoading, error };
}
