import {Component, EventEmitter, Output} from '@angular/core';
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Item} from "../../models/item.model";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {
  loading: boolean = true;
  @Output() scanDone = new EventEmitter;

  constructor(private firestoreService: FirestoreCrudService, private dialogService: DialogService ) {
  }

  camerasFound(event: any) {
    console.log('camerasFound ran! ' + event);
    this.loading = false;
  }

  camerasNotFound(event: any) {
    console.log('camerasNotFound run' + event);
  }

  scanSuccess(event: any) {
    let scannedItem: Item | undefined;
    this.firestoreService.getItem(event).subscribe({
      next: (data) => {
        scannedItem = data;
        if (scannedItem) {
          this.dialogService.openDialog(scannedItem, true);
          this.scanDone?.emit(event);
        }
    }}
    )
    console.log('scanSuccess ran! ' + event);
  }

  scanFailure(event: any) {
    console.log('scanFailure ran! ' + event);
  }

  scanError(event: any) {
    console.log('scanError ran!' + event);
  }

  scanComplete(event: any) {
    console.log('scanComplete ran!' + event);
  }

}
