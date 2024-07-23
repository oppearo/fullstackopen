import express from "express";
import { calculateBmi } from "./src/bmiCalculator";
import { calculateExercises } from "./src/exerciseCalculator";
import { Params } from "./src/utils/parseArguments";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const urlParams: Params = {
    firstValue: 0,
    restOfValues: [],
  };
  if (
    typeof req.query.height !== "string" ||
    typeof req.query.weight !== "string" ||
    isNaN(Number(req.query.height)) ||
    isNaN(Number(req.query.weight))
  ) {
    console.log(
      `improper query params, params: height: ${req.query.height}, weight: ${req.query.weight}`
    );
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    urlParams.firstValue = Number(req.query.height);
    urlParams.restOfValues.push(Number(req.query.weight));
    res.json({
      height: urlParams.firstValue,
      weight: urlParams.restOfValues[0],
      bmi: calculateBmi(urlParams),
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !daily_exercises.every((val: any) => !isNaN(Number(val)))
  ) {
    return res.status(400).json({ error: "malformatted parameter" });
  }
  const exercises = daily_exercises as number[];
  const result = calculateExercises(Number(target), exercises);
  return res.status(200).json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
