import { readFile, writeFile } from 'fs';

// Function to read file and process data
const readAndProcessData = (filePath) => {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
};

// Function to process data and output to console
const processData = (data) => {
  if (!data.users || !data.products) {
    throw new Error('Data structure is incorrect');
  }

  // Some modified
  const sortedUsers = data.users.sort((a, b) => a.age - b.age);
  console.log('USERS:');
  console.table(sortedUsers);

  const sortedProducts = data.products.sort((a, b) => a.price - b.price);
  console.log('PRODUCTS:');
  console.table(sortedProducts);

  // Compare sorted data for write to new file
  const sortedData = {
    users: sortedUsers,
    products: sortedProducts,
  };

  return sortedData;
};

const writeToFile = async (sortedData) => {
  const file = 'final_data.json';
  try {
    await writeFile(file, JSON.stringify(sortedData, null, 2), {
      encoding: 'utf8',
    });
    console.log('Data successfully written to:', file);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
};

const thirdTask = async (pathToFile) => {
  try {
    const data = await readAndProcessData(pathToFile);
    const sortedData = processData(data);
    await writeToFile(sortedData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default thirdTask;
