import axios, { AxiosError } from "axios";
import { API } from "../../constants";
import type { TrainData } from "./types";

export async function fetchTrainData(): Promise<TrainData | undefined> {
  try {
    const response = await axios.get<TrainData>(`${API}/train-data`);
    return response.data;
  } catch (err: unknown | AxiosError) {
    console.log("failed to fetch train data", err);
    if (axios.isAxiosError(err)) {
      throw new Error(err.message);
    }
  }
}
