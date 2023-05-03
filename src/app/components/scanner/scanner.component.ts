import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Item} from "../../models/item.model";
import {DialogService} from "../../services/dialog.service";
import {first, Subscription} from "rxjs";
import {NgxScannerQrcodeComponent, ScannerQRCodeResult} from "ngx-scanner-qrcode";


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements AfterViewInit {
  @Output() exitScan: EventEmitter<string> = new EventEmitter<string>();
  @Output() scanDone = new EventEmitter;
  @ViewChild('action') scanner!: NgxScannerQrcodeComponent;
  loading = true;
  getItemSubscription?: Subscription;

  constructor(
    private firestoreService: FirestoreCrudService,
    private dialogService: DialogService
    ) {
  }

  ngAfterViewInit(): void {
    this.scanner.start();
  }

  scanSuccess(id: any) {
    let scannedItem: Item | undefined;
    this.firestoreService.getItem(id).pipe(first()).subscribe({
        next: (data) => {
          scannedItem = data;
          if (scannedItem) {
            this.dialogService.openDialog(scannedItem, true);
          }
        }
      }
    )
    console.log('scanSuccess ran! ' + id);
  }

  onEvent($event: ScannerQRCodeResult[]) {
    this.scanDone?.emit($event[0].value);
    this.scanSuccess($event[0].value);
    this.onClose()
  }

  onClose() {
    this.scanner.stop();
    this.exitScan.emit();
  }
}
