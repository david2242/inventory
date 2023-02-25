import {Component, OnInit} from '@angular/core';
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Router} from "@angular/router";
import {City, Item} from "../../models/item.model";
import {DialogService} from "../../services/dialog.service";

interface cityOption {

}

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  constructor(
    private firestoreService: FirestoreCrudService,
    private router: Router,
    private dialogService: DialogService) {
      this.cities.unshift('');
  }

  public thisYear = String((new Date()).getFullYear());
  public itemList!: Item[];
  public listToShow = this.itemList;
  public cities: Array<City | ''> = Object.values(City);
  stockedThisYear(item: Item): boolean {
    console.log(item.stockTaking);
    console.log(String((new Date).getFullYear()));
    if (item.stockTaking){
      return !!item.stockTaking.filter((date: string) => date.startsWith(String((new Date).getFullYear()))).length;
    } else return false;
  }



  public active = true;
  public cityOption?: City;


  ngOnInit(): void {
    this.firestoreService.readAllItems().subscribe({
      next: (data) => {
        this.itemList = data;
        this.listToShow = this.itemList;
        this.applyFilter(this.cityOption, this.active);
      }
    });
  }

  displayedColumns: any = ['name', 'city', 'room', 'description', 'actions', 'state'];
  showScanner?: boolean;

  editItem(id: string) {
    this.router.navigate(['item', id]);
  }

  deleteItem(id: string) {
    console.log('delete item: ' + id)
    this.firestoreService.deleteItem(id);
  }

  toggleShowScanner() {
    this.showScanner = !this.showScanner;
  }

  scanDone(itemID: string) {
    this.markItemScanned(itemID);
    this.toggleShowScanner();
  }

  openDialog(item: Item) {
    console.log(item);
    this.dialogService.openDialog(item, false);
  }

  applyFilter(city: City | undefined, active: boolean) {
    if (!city) {
      this.listToShow = this.itemList;
    } else {
      this.listToShow = this.itemList.filter(item => item.city == city);
    }

    if (active) {
      this.listToShow = this.listToShow.filter(item => item.active)
    } else this.listToShow = this.listToShow.filter(item => item.active == false)
  }

  private markItemScanned(itemID: string) {
    console.log('I have found this item: ' + itemID);
    if (this.listToShow.filter((item) => item.customID ==itemID)) {
      console.log('We have it on the list');
    } else {
      console.log("We don't have it");
    }
  }
}
