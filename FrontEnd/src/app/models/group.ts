import { User } from "./user";

export class Group {
  group_id:string;
  group_name:string;
  create_date:Date;
  users:User[];
  admins:User[];
}
