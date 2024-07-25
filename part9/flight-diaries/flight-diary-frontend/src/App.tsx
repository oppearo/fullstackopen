import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaries";
import DiaryEntries from "./components/DiaryEntries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.pingBackend();
    diaryService.getAll().then((diaries) => {
      setDiaries(diaries);
    });
  }, []);

  return (
    <div>
      <h3>Diary entries</h3>
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
