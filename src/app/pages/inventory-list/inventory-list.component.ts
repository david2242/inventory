import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Router} from "@angular/router";
import {City, Item} from "../../models/item.model";
import {DialogService} from "../../services/dialog.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Subscription} from "rxjs";
import {User} from "../../models/user.model";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  readonly breakpoint$ = this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall]);
  private displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
  ]);
  public currentScreenSize = '';
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
      return !!item.stockTaking.filter((date: number) => (new Date()).getFullYear() == (new Date(date)).getFullYear()).length;
    } else return false;
  }

  editItem(id: string) {
    this.router.navigate(['item', id]);
  }

  deleteItem(id: string) {
    this.firestoreService.deleteItem(id);
  }

  toggleShowScanner() {
    this.showScanner = !this.showScanner;
  }

  openDialog(item: Item) {
    this.dialogService.openDialog(item, false);
  }

  applyFilter(city: City | undefined, active: boolean) {
    if (!city) {
      this.listToShow = this.itemList;
    } else {
      this.listToShow = this.itemList.filter(item => item.city == city);
    }
    this.listToShow = this.listToShow.filter(item => item.active === active);
  }

  getFullName(user?: User) {
    return user?.lastName.concat(' ', user.firstName);
  }
}
