import { DiaryEntry } from "../types";
import Diary from "./Diary";

interface DiaryEntriesProps {
  diaries: DiaryEntry[];
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  return props.diaries.map((diary) => <Diary key={diary.id} entry={diary} />);
};

export default DiaryEntries;
