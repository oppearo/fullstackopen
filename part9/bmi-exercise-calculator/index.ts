import express from "express";
import { calculateBmi } from "./src/bmiCalculator";
import { Params } from "./src/utils/parseArguments";

const app = express();

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
    res.status(400);
    console.log(
      `improper query params, params: height: ${req.query.height}, weight: ${req.query.weight}`
    );
    res.send({ error: "malformatted parameters" });
  } else {
    urlParams.firstValue = Number(req.query.height);
    urlParams.restOfValues.push(Number(req.query.weight));
    res.send({
      height: urlParams.firstValue,
      weight: urlParams.restOfValues[0],
      bmi: calculateBmi(urlParams),
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
