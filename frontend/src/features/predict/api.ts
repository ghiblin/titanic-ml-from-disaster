import axios, { AxiosError } from "axios";
import { API } from "../../constants";
import type { PredictDto, Prediction } from "./types";

export async function postPredict(
  dto: PredictDto
): Promise<Prediction | undefined> {
  try {
    const response = await axios.post<Prediction>(`${API}/predict`, dto);
    return response.data;
  } catch (err: unknown | AxiosError) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.message);
    }
  }
}
