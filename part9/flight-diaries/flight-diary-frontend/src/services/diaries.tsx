import axios from "axios";
import { DiaryEntry, NewDiary } from "../types";

const BASE_URL = "http://localhost:3000";

const pingBackend = async () => {
  axios.get(`${BASE_URL}/ping`);
};

const getAll = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(`${BASE_URL}/api/diaries`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw error;
    } else {
      console.log(error);
      throw new Error("not an Axios error");
    }
  }
};

const createDiary = async (entry: NewDiary) => {
  try {
    const response = await axios.post<NewDiary>(
      `${BASE_URL}/api/diaries`,
      entry
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw error;
    } else {
      console.log(error);
      throw new Error("Not an Axios error");
    }
  }
};

export default { getAll, pingBackend, createDiary };
