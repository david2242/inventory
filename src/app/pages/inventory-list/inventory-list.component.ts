import {Component, OnInit} from '@angular/core';
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Router} from "@angular/router";
import {Item} from "../../models/item.model";


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  constructor(private firestoreService: FirestoreCrudService, private router: Router) {
  }

  public itemList!: Item[];


  ngOnInit(): void {
    this.firestoreService.readAllItems().subscribe({
      next: (data) => {
        this.itemList = data;
        console.log(this.itemList);
      }
    })
  }

  displayedColumns: any = ['name', 'city', 'room', 'description', 'actions'];

  editItem(id: string) {
    this.router.navigate(['item', id]);
  }

  deleteItem(id: string) {
    console.log('delete item: ' + id)
    this.firestoreService.deleteItem(id);
  }

}
