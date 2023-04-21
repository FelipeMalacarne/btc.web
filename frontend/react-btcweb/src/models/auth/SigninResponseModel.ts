class SigninResponseModel {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];

  constructor(
    token: string,
    type: string,
    id: number,
    username: string,
    email: string,
    roles: string[]
  ) {
    this.token = token;
    this.type = type;
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}

export default SigninResponseModel;
