import fs from "fs";

export const readDataFromLocalFile = (pathToFile) => {
  try {
    const data = fs.readFileSync(pathToFile, "utf8");

    const number = parseInt(data);
    if (isNaN(number)) throw new Error("Data type error");

    return number;
  } catch (err) {
    console.error(err);
    return null;
  }
};
