import { readFileSync, writeFileSync } from 'fs';
import bcrypt from 'bcrypt';
import { UserModel } from './models/UserModel.js';

export class UserController {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readData() {
    try {
      const jsonData = readFileSync(this.filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error reading data:', error);
      return [];
    }
  }

  writeData(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      writeFileSync(this.filePath, jsonData);
    } catch (error) {
      console.error('Error writing data:', error);
    }
  }

  getAllUsers(req, res) {
    const data = this.readData();
    res.json(data);
  }

  getUserById(req, res) {
    const userId = Number(req.params.id);
    const data = this.readData();
    const user = data.find((item) => parseInt(item.id) === userId); // Перетворюємо item.id у число для порівняння
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

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

  deleteUserById(req, res) {
    const userId = Number(req.params.id); // Конвертуємо параметр у число
    const data = this.readData();
    const newData = data.filter((item) => item.id !== userId);
    this.writeData(newData);
    res.status(204).end();
  }

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
