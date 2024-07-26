import { useEffect, useState } from "react";
import { DiaryEntry, NewDiary } from "./types";
import diaryService from "./services/diaries";
import DiaryEntries from "./components/DiaryEntries";
import EntryForm from "./components/EntryForm";
import { isAxiosError } from "axios";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const diaries = await diaryService.getAll();
        setDiaries(diaries);
      } catch (error) {
        if (isAxiosError(error)) {
          setErrorMessage("Axios error: " + error.message);
        } else {
          setErrorMessage("Unknown error: " + error);
        }
        setDiaries([]);
        setTimeout(() => setErrorMessage(""), 8000);
      }
    };
    fetchDiaries();
  }, []);

  const addDiary = async (diaryObject: NewDiary) => {
    try {
      const request = await diaryService
        .createDiary(diaryObject)
        .then((response) => setDiaries(diaries.concat(response as DiaryEntry)));
      return request;
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage("Axios error occured! " + error.message);
        setTimeout(() => setErrorMessage(""), 5000);
      } else {
        setErrorMessage("Unknown error: " + error);
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: "red" }}>{errorMessage}</h2>
      <EntryForm createDiary={addDiary} />
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
