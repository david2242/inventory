import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Router} from "@angular/router";
import {City, Item} from "../../models/item.model";
import {DialogService} from "../../services/dialog.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit, OnDestroy {
  readonly breakpoint$ = this.breakpointObserver.observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall]);
  private displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  private currentScreenSize: string = '';
  private breakpointSubscription?: Subscription;
  public thisYear = String((new Date()).getFullYear());
  public itemList!: Item[];
  public listToShow = this.itemList;
  public cities: Array<City | ''> = Object.values(City);
  public active = true;
  public cityOption?: City;
  private allColumns: string[] = ['name', 'city', 'room', 'description', 'actions', 'state'];
  public displayedColumns: string[] = this.allColumns;
  public showScanner?: boolean;

  constructor(
    private firestoreService: FirestoreCrudService,
    private router: Router,
    private dialogService: DialogService,
    private breakpointObserver: BreakpointObserver) {
      this.cities.unshift('');
  }

  ngOnDestroy(): void {
       this.breakpointSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.firestoreService.readAllItems().subscribe({
      next: (data) => {
        this.itemList = data;
        this.listToShow = this.itemList;
        this.applyFilter(this.cityOption, this.active);
      }
    });
    this.breakpointSubscription = this.breakpoint$
      .subscribe(result => {

        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
        this.displayedColumns =  structuredClone(this.allColumns);
        if (this.currentScreenSize == 'Small') {
          this.displayedColumns.splice(2, 2);
        }
        if (this.currentScreenSize == 'XSmall') {
          this.displayedColumns.splice(1, 3);
        }
      })
  }

  stockedThisYear(item: Item): boolean {
    if (item.stockTaking){
      return !!item.stockTaking.filter((date: string) => date.startsWith(String((new Date).getFullYear()))).length;
    } else return false;
  }

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
    } else this.listToShow = this.listToShow.filter(item => item.active)
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
