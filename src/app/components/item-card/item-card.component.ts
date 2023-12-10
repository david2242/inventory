import {Component, Inject} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogDataItem} from "../../models/item.model";
import { MatButtonModule } from "@angular/material/button";
import { NgIf, DatePipe } from "@angular/common";

@Component({
    selector: "app-item-card",
    templateUrl: "./item-card.component.html",
    styleUrls: ["./item-card.component.scss"],
    standalone: true,
    imports: [MatDialogModule, NgIf, MatButtonModule, DatePipe]
})
export class ItemCardComponent {

  constructor(
    public dialogRef: MatDialogRef<ItemCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataItem,
    private firestore: FirestoreCrudService,
    private matSnackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  pushToStocked() {
    if (!this.data.item.customID) {
      return;
    }
    const currentDate = Date.now();
    this.data.item.stockTaking ? this.data.item.stockTaking.push(currentDate) : this.data.item.stockTaking = [currentDate]
    this.firestore.updateStocking(this.data.item.customID, this.data.item.stockTaking)
      .then(() => this.matSnackBar.open("Leltározva!", (new Date(currentDate)).toLocaleString()));
  }
}
