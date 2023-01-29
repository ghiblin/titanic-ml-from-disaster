import { useQuery } from "react-query";
import { fetchTrainData } from "./api";
import { TrainData } from "./types";

export function useTrainData() {
  return useQuery<TrainData | undefined, Error>("train-data", fetchTrainData);
}
