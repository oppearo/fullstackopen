interface ExerciseResult {
  periodLength: number;
  trainingDayAmount: number;
  averageTrainingTime: number;
  target: number;
  targetReached: boolean;
  trainingRating: number;
  trainingRatingDescription: string;
}

const calculateExercises = (
  dailyExercises: number[],
  averageExerciseTarget: number
): ExerciseResult => {
  if (!dailyExercises?.length) {
    console.log("no exercise array provided!");
    return null;
  }
  let resultObject: ExerciseResult = {
    periodLength: dailyExercises.length,
    trainingDayAmount: dailyExercises.filter((num) => num > 0).length,
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
