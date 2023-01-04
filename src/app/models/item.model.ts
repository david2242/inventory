import {User} from "./user.model";

export interface Item {
  name: string,
  city: string,
  room: string,
  description: string,
  createdTime: Date,
  createdBy: User
}
