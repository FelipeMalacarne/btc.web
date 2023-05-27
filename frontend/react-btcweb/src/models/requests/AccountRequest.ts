import RoleSetRequest from "./RolesSetRequest";

class AccountRequest {
    username: string;
    cpf: string;
    email: string;
    password: string;
    roles: RoleSetRequest[];

    constructor(username: string, cpf: string, email: string, password: string, roles: RoleSetRequest[]){
        this.username = username;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}

export default AccountRequest;