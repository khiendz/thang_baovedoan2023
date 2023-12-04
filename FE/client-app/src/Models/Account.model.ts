import { User } from "./User.model";

export class Account {
  AccountId: number;
  UserName: string;
  Password: string;
  RoleId: number;
  UserId: number;
  User: User;
}