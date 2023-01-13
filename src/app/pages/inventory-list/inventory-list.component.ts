import { Component, OnInit } from '@angular/core';
import {CrudService} from "../../services/crud.service";
import {Item} from "../../models/item.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent {

  constructor(private firestore: AngularFirestore) {
    this.itemListFromFire = firestore.collection('inventory').valueChanges();
  }

  public itemListFromFire?: Observable<any>;

}
