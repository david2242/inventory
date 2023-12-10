import { Injectable } from "@angular/core";
import {Item} from "../models/item.model";
import {ItemCardComponent} from "../components/item-card/item-card.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: "root"
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(item: Item, scanned: boolean): void {
    this.dialog.open(ItemCardComponent, {
      data: {
        item: item,
        scanned: scanned
      }, //TODO: a dialoghoz hozzá kellene adni, hogy szkennelés történt-e, és akkor lehet hozzáadni a leltár-eredményhez

    });
  }

}
