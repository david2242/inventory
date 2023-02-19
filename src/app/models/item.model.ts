import {User} from "./user.model";

export interface Item {
  customID?: string
  name: string,
  city: string,
  room: string,
  description: string,
  createdTime: any,
  modifiedTime?: any,
  createdBy: User,
  modifiedBy?: User
}
