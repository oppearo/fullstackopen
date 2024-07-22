import { Params, parseArguments } from "./utils/parseArguments";

const calculateBmi = (parms: Params): string => {
  const weightInKg = parms.firstValue;
  const heightInCm = parms.restOfValues[0];
  const bmi: number = weightInKg / (heightInCm / 100) ** 2;
  if (bmi >= 30) return "obese";
  if (bmi >= 25 && bmi < 30) return "overweight";
  if (bmi >= 18.5 && bmi < 25) return "normal weight";
  if (bmi < 18.5) return "underweight";
  if (bmi === 0) return "BMI can't be zero!";
};

try {
  const parms: Params = parseArguments(process.argv);
  console.log(calculateBmi(parms));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
