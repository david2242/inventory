import {Component, OnInit} from "@angular/core";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {City, Item} from "../../models/item.model";
import { NgxKjuaModule } from "ngx-kjua";
import { MatOptionModule } from "@angular/material/core";
import { NgFor } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
    selector: "app-qr-generate",
    templateUrl: "./qr-generate.component.html",
    styleUrls: ["./qr-generate.component.scss"],
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, NgFor, MatOptionModule, NgxKjuaModule]
})
export class QrGenerateComponent implements OnInit {
  public itemList?: Item[];
  public listToShow?: Item[];
  public cities: Array<City | ""> = Object.values(City);
  public cityOption?: City;

  constructor(private firestoreService: FirestoreCrudService) {
    this.cities.unshift("");
  }

  ngOnInit(): void {
    this.firestoreService.readAllItems().subscribe({
      next: (data) => {
        this.itemList = data;
        this.listToShow = this.itemList;
        this.applyFilter(this.cityOption);
      }
    })
  }

  applyFilter(city: City | undefined) {
    if (!city && this.itemList) {
      this.listToShow = this.itemList;
    } else {
      this.listToShow = this.itemList?.filter(item => item.city == city && item.active);
    }
  }

}
