import { readFile, writeFile } from "fs";

// Function to read file and process data
export const readAndProcessData = (filePath, callback) => {
  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      // Pass error to callback
      callback(err, null);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      // Call callback with processed data
      callback(null, jsonData);
    } catch (parseErr) {
      // JSON parse error
      callback(parseErr, null);
    }
  });
};

// Function to process data and output to console
export const processData = (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }

  if (!data.users || !data.products) {
    console.error("Error: Data structure is incorrect");
    return;
  }

  // Some modifeed
  const sortedUsers = data.users.sort((a, b) => a.age - b.age);
  console.log("USERS:");
  console.table(sortedUsers);

  const sortedProducts = data.products.sort((a, b) => a.price - b.price);
  console.log("PRODUCTS:");
  console.table(sortedProducts);

  // Compare sorted data for write to new file
  const sortedData = {
    users: sortedUsers,
    products: sortedProducts,
  };

  const file = "modified_data.json";

  // Write modified data to a new file
  writeFile(file, JSON.stringify(sortedData, null, 2), "utf8", (writeErr) => {
    if (writeErr) {
      console.error("Error writing to file:", writeErr);
      return;
    }

    console.log("Data successfully written to:", file);
  });
};
