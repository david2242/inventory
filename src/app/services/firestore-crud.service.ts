import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Item} from "../models/item.model";
import {first, Observable, take} from "rxjs";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirestoreCrudService {

  private itemDoc?: AngularFirestoreDocument<Item>;

  constructor(private firestore: AngularFirestore) { }

  addItem(item: Item) {
    const inventory = this.firestore.collection<Item>('inventory');
    return inventory.add(item);
  }

  deleteItem(id: string) {
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    return this.itemDoc.delete();
  }

  readAllItems(): Observable<any> {
    return this.firestore.collection('inventory').valueChanges({ idField: 'customID' })
  }

  getItem(id: string): Observable<Item | undefined> {
    this.itemDoc = this.firestore.doc<Item>('inventory/' + id);
    return this.itemDoc.valueChanges({ idField: 'customID' });
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
