import { DiaryEntry } from "../types";
import Diary from "./Diary";

interface DiaryEntriesProps {
  diaries: DiaryEntry[];
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return (
    <div>
      <h3>Diary entries</h3>
      {props.diaries.map((diary) => (
        <Diary key={diary.id} entry={diary} />
      ))}
    </div>
  );
};

export default DiaryEntries;
