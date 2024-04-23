export const sumTwoValues = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Invalid input, both values must be numbers");
  }
  
  return a + b;
};
