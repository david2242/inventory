import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from "@angular/core";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {Item} from "../../models/item.model";
import {DialogService} from "../../services/dialog.service";
import {first, Subscription} from "rxjs";
import { NgxScannerQrcodeComponent, ScannerQRCodeResult, NgxScannerQrcodeModule } from "ngx-scanner-qrcode";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf, NgFor } from "@angular/common";


@Component({
    selector: "app-scanner",
    templateUrl: "./scanner.component.html",
    styleUrls: ["./scanner.component.scss"],
    standalone: true,
    imports: [NgIf, MatFormFieldModule, MatSelectModule, FormsModule, MatOptionModule, NgFor, MatButtonModule, MatIconModule, NgxScannerQrcodeModule]
})
export class ScannerComponent implements AfterViewInit {
  @Output() exitScan: EventEmitter<string> = new EventEmitter<string>();
  @Output() scanDone = new EventEmitter;
  @ViewChild("action") scanner!: NgxScannerQrcodeComponent;
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

  scanSuccess(id: string) {
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
    console.log("scanSuccess ran! " + id);
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
