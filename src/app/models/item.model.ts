import {User} from "./user.model";

export interface Item {
  customID?: string
  active: boolean
  name: string,
  city: City,
  room: string,
  description: string,
  createdTime?: string,
  modifiedTime?: string,
  createdBy?: User,
  modifiedBy?: User,
  stockTaking?: string[]
}

export interface DialogDataItem {
  item: Item,
  scanned: boolean
}

export enum City {
  ALAP = 'Alap',
  ALSOSZENTIVAN = 'Alsószentiván',
  CECE = 'Cece',
  IGAR = 'Igar',
  MEZOSZILAS = 'Mezőszilas',
  SAREGRES = 'Sáregres',
  SARSZENTAGOTA = 'Sárszentágota',
  VAJTA = 'Vajta',
}
