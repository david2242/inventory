import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ItemCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: FirestoreCrudService,
    private matSnackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    //TODO: why open 2x
  }

  pushToStocked() {
    const currentDate = (new Date()).toLocaleDateString('hu');
    this.data.item.stockTaking ? this.data.item.stockTaking.push(currentDate) : this.data.item.stockTaking = [currentDate]
    this.firestore.updateStocking(this.data.item.customID, this.data.item.stockTaking)
      .then(() => this.matSnackBar.open('Leltározva!', currentDate));
  }
}
