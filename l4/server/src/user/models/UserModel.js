export class UserModel {
  constructor(name, email, password) {
    this.id = Date.now() * Math.random();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
