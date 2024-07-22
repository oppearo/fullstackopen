const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const bmi: number = weightInKg / (heightInCm / 100) ** 2;
  if (bmi >= 30) return "obese";
  if (bmi >= 25 && bmi < 30) return "overweight";
  if (bmi >= 18.5 && bmi < 25) return "normal weight";
  if (bmi < 18.5) return "underweight";
  if (bmi === 0) return "BMI can't be zero!";
};

console.log(calculateBmi(180, 74));
