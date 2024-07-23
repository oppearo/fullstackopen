export interface Params {
  firstValue: number;
  restOfValues: number[];
}

export const parseArguments = (args: string[]): Params => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const returnObject: Params = {
    firstValue: 0,
    restOfValues: [],
  };
  if (!isNaN(Number(args[2]))) {
    returnObject.firstValue = Number(args[2]);
  } else {
    throw new Error("First parameter was not a number!");
  }
  const restOfValues = args.slice(3);
  const temp: number[] = [];
  for (const val of restOfValues) {
    if (!isNaN(Number(val))) {
      temp.push(Number(val));
    } else {
      throw new Error(
        `the parameter ${val} is not a number, please check input!`
      );
    }
  }
  returnObject.restOfValues = temp;
  return returnObject;
};
