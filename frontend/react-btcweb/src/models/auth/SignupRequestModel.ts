class SignupRequestModel{
  name: string;
  cpf: string;
  email: string;
  password: string;
  roles: string[];

  constructor(name: string, cpf: string, email: string, password: string, roles: string[]) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}

export default SignupRequestModel;