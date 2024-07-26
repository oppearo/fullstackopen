import { useState } from "react";
import { NewDiary, Visibility, Weather } from "../types";

interface EntryFormProps {
  createDiary: (obj: NewDiary) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(
    "great" as Visibility
  );
  const [weather, setWeather] = useState<Weather>("sunny" as Weather);
  const [comment, setComment] = useState<string>("");

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiary = {
      date,
      visibility,
      weather,
      comment,
    };
    console.log(newDiary);
    props.createDiary(newDiary);
    setComment("");
    setDate("");
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          visibility: <label htmlFor="great">great</label>
          <input
            type="radio"
            name="visibility"
            id="great"
            checked={visibility === "great"}
            onChange={() => setVisibility("great" as Visibility)}
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            name="visibility"
            id="good"
            checked={visibility === "good"}
            onChange={() => setVisibility("good" as Visibility)}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            name="visibility"
            id="ok"
            checked={visibility === "ok"}
            onChange={() => setVisibility("ok" as Visibility)}
          />
          <label htmlFor="poor">poor</label>
          <input
            type="radio"
            name="visibility"
            id="poor"
            checked={visibility === "poor"}
            onChange={() => setVisibility("poor" as Visibility)}
          />
        </div>
        <div>
          weather: <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            name="weather"
            id="sunny"
            checked={weather === "sunny"}
            onChange={() => setWeather("sunny" as Weather)}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            name="weather"
            id="rainy"
            checked={weather === "rainy"}
            onChange={() => setWeather("rainy" as Weather)}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            name="weather"
            id="cloudy"
            checked={weather === "cloudy"}
            onChange={() => setWeather("cloudy" as Weather)}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            name="weather"
            id="stormy"
            checked={weather === "stormy"}
            onChange={() => setWeather("stormy" as Weather)}
          />
          <label htmlFor="windy">windy</label>
          <input
            type="radio"
            name="weather"
            id="windy"
            checked={weather === "windy"}
            onChange={() => setWeather("windy" as Weather)}
          />
        </div>
        <div>
          comment:{" "}
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default EntryForm;
