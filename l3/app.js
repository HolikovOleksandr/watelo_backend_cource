import { readAndProcessData, processData } from "./tasks/firstTask.js";

const firstTask = () => readAndProcessData("./data/data.json", processData);

export const app = () => {
  firstTask();
};

app();
