import ERoles from "./ERoles";

class AccountModel {
  id: number;
  name: string;
  cpf: string;
  email: string;  
  password: string;
  roles: ERoles[];

  constructor(id: number, name: string, cpf: string, email: string, password: string, roles: ERoles[]) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

}

export default AccountModel;