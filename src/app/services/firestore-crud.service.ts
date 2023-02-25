import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {Item} from "../models/item.model";
import {first, map, Observable, take} from "rxjs";
import * as firebase from 'firebase/app';

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
    return this.firestore.collection('inventory').get().pipe(
      map((items) => items.docs.map((item) => {
        const convertedItem: any = item.data(); // TODO: Any is here
        convertedItem.customID = item.id;
        return convertedItem;
      }))
    )
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
    console.log(id);
    console.log(date);
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    let leltarAdat: any[] = [];
    this.getItem(id).pipe(first()).subscribe({
      next: (item) => {
        if (item?.stockTaking) {
          leltarAdat = item.stockTaking
        }
        console.log('databaseben: ' + item?.stockTaking);
        console.log('if ág')
        console.log(leltarAdat);
        console.log(leltarAdat.length);
        if (leltarAdat) {
          console.log('before push' + leltarAdat);
          if (!leltarAdat.includes(date)) {
            leltarAdat.push(date);
          }
          console.log('after push: ' + leltarAdat);
        } else {
          leltarAdat = [date];
          console.log('created array: ' + leltarAdat);
        }
        return this.itemDoc!.update({'stockTaking': leltarAdat})
      }
    })
  }
}
