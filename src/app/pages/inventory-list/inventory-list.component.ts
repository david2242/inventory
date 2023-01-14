import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item.model";
import {Observable} from "rxjs";
import {FirestoreCrudService} from "../../services/firestore-crud.service";


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent {

  constructor(private firestoreService: FirestoreCrudService) {
    this.itemListFromFire = firestoreService.readAllItems();
  }

  public itemListFromFire?: Observable<any>;

  editItem(id: string) {
    console.log('edit item: ' + id);

  }

  deleteItem(id: string) {
    console.log('delete item: ' + id)
    this.firestoreService.deleteItem(id);
  }
}
