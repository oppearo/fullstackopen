import axios from "axios";
import { DiaryEntry } from "../types";

const BASE_URL = "http://localhost:3000";

const pingBackend = () => {
  axios.get(`${BASE_URL}/ping`);
};

const getAll = () => {
  return axios
    .get<DiaryEntry[]>(`${BASE_URL}/api/diaries`)
    .then((res) => res.data);
};

export default { getAll, pingBackend };
