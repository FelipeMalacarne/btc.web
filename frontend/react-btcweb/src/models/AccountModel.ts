import ERoles from "./ERoles";
import RoleModel from "./RoleModel";

class AccountModel {
  id: number;
  name: string;
  cpf: string;
  email: string;  
  password: string;
  roles: RoleModel[];

  constructor(id: number, name: string, cpf: string, email: string, password: string, roles: RoleModel[]) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

}

export default AccountModel;