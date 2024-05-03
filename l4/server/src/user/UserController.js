import { readFileSync, writeFileSync } from 'fs';
import bcrypt from 'bcrypt';
import { UserModel } from './models/UserModel.js';

/**
 * Controller class for managing user data.
 */
export class UserController {
  /**
   * Constructs a new UserController instance.
   * @param {string} filePath - The path to the JSON file containing user data.
   */
  constructor(filePath) {
    this.filePath = filePath;
  }

  /**
   * Reads user data from the JSON file.
   * @returns {Array} The array of user data.
   */
  readData() {
    try {
      const jsonData = readFileSync(this.filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error reading data:', error);
      return [];
    }
  }

  /**
   * Writes user data to the JSON file.
   * @param {Array} data - The array of user data to write.
   */
  writeData(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      writeFileSync(this.filePath, jsonData);
    } catch (error) {
      console.error('Error writing data:', error);
    }
  }

  /**
   * Retrieves all users.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  getAllUsers(req, res) {
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

    const existingUser = data.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new UserModel(name, email, hashedPassword);
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
    const index = data.findIndex((item) => parseInt(item.id) === userId);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedData };
      this.writeData(data);
      res.json(data[index]);
    } else {
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
    const newData = data.filter((item) => item.id !== userId);
    this.writeData(newData);
    res.status(204).end();
  }

  /**
   * Deletes all users.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  deleteAllUsers(req, res) {
    try {
      this.writeData([]);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting all users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
