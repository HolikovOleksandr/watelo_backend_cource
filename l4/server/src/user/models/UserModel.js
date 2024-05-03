export class UserModel {
  constructor(name, email, password) {
    this.id = Math.round(Date.now() * Math.random());
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
