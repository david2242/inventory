import {Component, OnInit} from '@angular/core';
import {FirestoreCrudService} from "../../../services/firestore-crud.service";
import {Item} from "../../../models/item.model";

@Component({
  selector: 'app-qr-generate',
  templateUrl: './qr-generate.component.html',
  styleUrls: ['./qr-generate.component.scss']
})
export class QrGenerateComponent implements OnInit {
  public itemList?: Item[];

  constructor(private firestoreService: FirestoreCrudService) {
  }

  ngOnInit(): void {
    this.firestoreService.readAllItems().subscribe({
      next: (data) => {
        this.itemList = data;
        console.log(this.itemList);
      }
    })
  }
}
