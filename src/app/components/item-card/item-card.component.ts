import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Item} from "../../models/item.model";
import {FirestoreCrudService} from "../../services/firestore-crud.service";

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ItemCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: FirestoreCrudService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    //TODO: why open 2x
  }

  pushToStocked() {
    let currentDate = (new Date()).toLocaleDateString('hu');
    this.firestore.updateStocking(this.data.item.customID, currentDate);
      // .then(() => console.log('pushed to stock'));
  }
}
