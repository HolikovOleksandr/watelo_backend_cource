import fs from 'fs';
import { UserModel } from './models/UserModel.js';
import bcrypt from 'bcrypt';

/**
 * Controller class for managing user data.
 */
export class UserController {
  /**
   * Constructs a new UserController instance.
   * @param {string} filePath - The path to the JSON file containing user data.
   */
  constructor(filePath) {
    // Check if the file path is a string
    if (typeof filePath !== 'string') {
      throw new Error('⛔ UserController expects string path to db json file');
    }

    // Set the file path
    this.filePath = filePath;
  }

  /**
   * Reads user data from the JSON file.
   * @returns {Array} The array of user data.
   */
  readData() {
    try {
      // Read the JSON file and parse its contents
      const jsonData = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      // Handle errors while reading data
      console.error('Error reading data:', error);
      return [];
    }
  }

  /**
   * Writes user data to the JSON file.
   * @param {Array} data - The array of user data to write.
   * @returns {Promise<void>} - A promise that resolves when the data is successfully written or rejects if an error occurs.
   */
  async writeData(data) {
    // Extract directory from file path
    const directory = this.filePath.split('/').slice(0, -1).join('/');
    const jsonData = JSON.stringify(data, null, 2);

    try {
      // Check if the file exists
      const fileExists = fs.existsSync(this.filePath);

      // If the file doesn't exist, create it
      if (!fileExists) {
        await fs.promises.mkdir(directory, { recursive: true });
      }

      // Write data to the file
      await fs.promises.writeFile(this.filePath, jsonData);

      console.log('Data written to file successfully.');
    } catch (error) {
      // Handle errors while writing data
      console.error('Error writing data to file:', error);
      throw error;
    }
  }

  /**
   * Retrieves all users.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getAllUsers(req, res) {
    // Read data from file and send it as response
    const data = this.readData();
    res.json(data);
  }

  /**
   * Retrieves a user by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getUserById(req, res) {
    const userId = Number(req.params.id);
    const data = this.readData();
    const user = data.find((item) => parseInt(item.id) === userId);

    // If user found, send it as response; otherwise, send 404 error
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  /**
   * Creates a new user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createNewUser(req, res) {
    const data = this.readData();
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = data.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new UserModel(name, email, hashedPassword);

    // Add the new user and write data to file
    data.push(newUser);
    this.writeData(data);
    res.status(201).json(newUser);
  }

  /**
   * Updates a user by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  updateUser(req, res) {
    const userId = Number(req.params.id);
    const updatedData = req.body;
    const data = this.readData();

    // Find the index of the user to update
    const index = data.findIndex((i) => parseInt(i.id) === userId);
    if (index !== -1) {
      // Update user data and write back to file
      data[index] = { ...data[index], ...updatedData };
      this.writeData(data);
      res.json(data[index]);
    } else {
      // If user not found, send 404 error
      res.status(404).json({ message: 'User not found' });
    }
  }

  /**
   * Deletes a user by ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  deleteUserById(req, res) {
    const userId = Number(req.params.id);
    const data = this.readData();
    const userIndex = data.findIndex((item) => item.id === userId);

    // If user not found, send 404 error
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ message: `User with Id ${userId} not found` });
    }

    // Filter out the user with the specified ID
    const newData = data.filter((item) => item.id !== userId);

    try {
      // Write the updated data back to the file
      this.writeData(newData);
      // Send success message in the response
      res.status(200).json({
        message: `User with ID ${userId} has been deleted `,
      });
    } catch (error) {
      // Handle errors while deleting user
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * Deletes all users.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  deleteAllUsers(req, res) {
    try {
      // Write an empty array to the file to delete all users
      this.writeData([]);
      // Send success message in the response
      res.status(200).json({ message: 'All users have been deleted' });
    } catch (error) {
      // Handle errors while deleting all users
      console.error('Error deleting all users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
