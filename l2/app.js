import { readDataFromLocalFile } from "./src/reedDataFromLocalFile.js";
import { sumTwoValues } from "./src/sumTwoValues.js";

export const app = () => {
  const aFilePath = "./files/a.txt";
  const bFilePath = "./files/b.txt";

  const aValue = readDataFromLocalFile(aFilePath);
  console.log("A: ", aValue);

  const bValue = readDataFromLocalFile(bFilePath);
  console.log("B: ", bValue);

  const result = sumTwoValues(aValue, bValue);
  console.log("A + B = ", result);
};

app();
