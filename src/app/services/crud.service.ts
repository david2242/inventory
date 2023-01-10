import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs"
import {Item} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  private BASE_URL: string = 'http://localhost:3000/';

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private httpRequestOptions: object = {
    headers: this.httpHeaders,
    observe: 'body',
    responseType: 'json'
  };

  createItem(newItem: Item) {
    return this.http.post(this.BASE_URL + 'items', newItem);
  }

  getItems() {
    return this.http.get<Item[]>(this.BASE_URL + 'items', this.httpRequestOptions)
  }
}
