import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {Item} from "../models/item.model";
import {first, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirestoreCrudService {

  constructor(private firestore: AngularFirestore) { }

  private itemDoc?: AngularFirestoreDocument<Item>;
  private inventoryCollection: AngularFirestoreCollection<Item> = this.firestore.collection<Item>('inventory');

  addItem(item: Item): Promise<DocumentReference<Item>> {
    return this.inventoryCollection.add(item);
  }

  deleteItem(id: string): Promise<void> {
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    return this.itemDoc.delete();
  }

  readAllItems(): Observable<Item[]> {
    return this.firestore.collection<Item>('inventory').valueChanges();
  }

  getItem(id: string): Observable<Item | undefined> {
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    return this.itemDoc.get().pipe(
      map((item) => {
        const convertedItem: any = item.data();
        convertedItem.customID= item.id;
        return convertedItem;
      })
    )
  }

  updateItem(id: string, data: Item): Promise<void> {
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    return this.itemDoc.update(data);
  }

  updateStocking(id: string, date: string) {
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    let leltarAdat: any[] = [];
    this.getItem(id).pipe(first()).subscribe({
      next: (item) => {
        if (item?.stockTaking) {
          leltarAdat = item.stockTaking
        }
        if (leltarAdat) {
          if (!leltarAdat.includes(date)) {
            leltarAdat.push(date);
          }
        } else {
          leltarAdat = [date];
        }
        return this.itemDoc?.update({'stockTaking': leltarAdat})
      }
    })
  }
}
