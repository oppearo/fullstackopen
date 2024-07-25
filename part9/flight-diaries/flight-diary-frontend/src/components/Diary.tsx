import { DiaryEntry } from "../types";

interface DiaryEntryProps {
  entry: DiaryEntry;
}

const Diary = (props: DiaryEntryProps) => {
  return (
    <div>
      <b>{props.entry.date}</b>
      <p>
        visibility: {props.entry.visibility} <br />
        weather: {props.entry.weather}
      </p>
    </div>
  );
};

export default Diary;
