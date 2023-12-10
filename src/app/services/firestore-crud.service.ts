import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Item } from "../models/item.model";
import { map, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirestoreCrudService {

  constructor(private firestore: AngularFirestore) { }

  private itemDoc?: AngularFirestoreDocument<Item>;
  private inventoryCollection: AngularFirestoreCollection<Item> = this.firestore.collection<Item>("inventory");

  addItem(item: Item): Promise<void> {
    const customID: string = this.firestore.createId();
    return this.inventoryCollection.doc(customID).set({
      ...item,
      "customID": customID
    });
  }

  deleteItem(id: string): Promise<void> {
    this.itemDoc = this.firestore.doc<Item>("inventory/" + id);
    return this.itemDoc.delete();
  }

  readAllItems(): Observable<Item[]> {
    return this.firestore.collection<Item>("inventory").valueChanges();
  }

  getItem(id: string): Observable<Item | undefined> {
    this.itemDoc = this.firestore.doc<Item>("inventory/" + id);
    return this.itemDoc.get().pipe(
      map((item) => {
        return item.data();
      })
    )
  }

  updateItem(id: string, data: Item): Promise<void> {
    this.itemDoc = this.firestore.doc<Item>("inventory/" + id);
    return this.itemDoc.update(data);
  }

  updateStocking(id: string, stockTaking: number[]) {
    this.itemDoc = this.firestore.doc<Item>("inventory/" + id);
    return this.itemDoc?.update({"stockTaking": stockTaking})
  }
}
