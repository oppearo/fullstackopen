import { Params, parseArguments } from "./utils/parseArguments";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  averageTrainingTime: number;
  target: number;
  targetReached: boolean;
  trainingRating: number;
  trainingRatingDescription: string;
}

const calculateExercises = (
  averageExerciseTarget: number,
  dailyExercises: number[]
): ExerciseResult => {
  const resultObject: ExerciseResult = {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((num) => num > 0).length,
    averageTrainingTime: 0,
    target: averageExerciseTarget,
    targetReached: false,
    trainingRating: 0,
    trainingRatingDescription: "",
  };

  const totalTraining = dailyExercises.reduce((a, b) => a + b, 0);
  resultObject.averageTrainingTime = totalTraining / dailyExercises.length;

  resultObject.targetReached =
    resultObject.averageTrainingTime >= averageExerciseTarget;
  resultObject.trainingRating = Math.round(resultObject.averageTrainingTime);

  switch (resultObject.trainingRating) {
    case 1:
      resultObject.trainingRatingDescription = "room for improvement";
      break;
    case 2:
      resultObject.trainingRatingDescription =
        "not too bad but could be better";
      break;
    case 3:
      resultObject.trainingRatingDescription = "excellent work!";
      break;
    default:
      resultObject.trainingRatingDescription =
        "off the charts! not a good thing though so check given values";
      break;
  }
  return resultObject;
};

try {
  const parms: Params = parseArguments(process.argv);
  console.log(calculateExercises(parms.firstValue, parms.restOfValues));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
