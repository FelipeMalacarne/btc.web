import ERoles from "./ERoles";

class RoleModel{
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default RoleModel;