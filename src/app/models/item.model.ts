import {User} from "./user.model";

export interface Item {
  name: string,
  city: string,
  room: string,
  description: string,
  createdTime: Date,
  modifiedTime?: Date
  createdBy: User,
  modifiedBy?: User
}
