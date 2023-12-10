import {Component, OnInit} from "@angular/core";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {City, Item} from "../../models/item.model";

@Component({
  selector: "app-qr-generate",
  templateUrl: "./qr-generate.component.html",
  styleUrls: ["./qr-generate.component.scss"]
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
