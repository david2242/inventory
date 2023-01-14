import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Item} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class FirestoreCrudService {

  private itemDoc?: AngularFirestoreDocument<Item>;
  public editingMode: boolean = false;

  constructor(private firestore: AngularFirestore) { }

  addItem(item: Item) {
    const inventory = this.firestore.collection<Item>('inventory');
    inventory.add(item);
  }

  //TODO: Create update service
  updateItem(id: string) {
  }

  deleteItem(id: string) {
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    this.itemDoc.delete();
  }

  readAllItems() {
    return this.firestore.collection('inventory').valueChanges({ idField: 'customID' });
  }
}
