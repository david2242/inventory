import { Component, OnInit } from '@angular/core';
import {CrudService} from "../../services/crud.service";
import {Item} from "../../models/item.model";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  constructor(private crudService: CrudService) { }

  public itemList: Item[] | undefined;

  ngOnInit(): void {
    this.crudService.getItems().subscribe({
      next: (data: Item[]) => {
        this.itemList = data;
        console.log(this.itemList);
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    })
  }


}
