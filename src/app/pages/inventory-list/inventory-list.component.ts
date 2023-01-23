import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent {

  constructor(private firestoreService: FirestoreCrudService, private router: Router) {
    this.itemListFromFire = firestoreService.readAllItems();
  }

  public itemListFromFire?: Observable<any>;

  editItem(id: string) {
    this.router.navigate(['item', id]);
  }

  deleteItem(id: string) {
    console.log('delete item: ' + id)
    this.firestoreService.deleteItem(id);
  }
}
