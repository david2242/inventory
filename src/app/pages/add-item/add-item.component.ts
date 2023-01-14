import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Item} from "../../models/item.model";
import {User} from "../../models/user.model";
import {CrudService} from "../../services/crud.service";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore"
import {FirestoreCrudService} from "../../services/firestore-crud.service";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  private actualUser: User = {
    firstName: 'Tomi',
    lastName: 'Vargha',
    role: 'unknown'
  }

  private newRecord: Item = {
    name: '',
    city: '',
    room: '',
    description: '',
    createdTime: new Date(),
    createdBy: {
      firstName: '',
      lastName: '',
      role: ''
    }
  };
  editingMode: boolean = false;

  constructor(private firestoreService: FirestoreCrudService) {

  }

  public recordForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    room: new FormControl(''),
    description: new FormControl(''),
  }) //TODO: Validator

  ngOnInit(): void {
    this.editingMode = this.firestoreService.editingMode;
  }

  onSubmit() {
    this.newRecord = this.recordForm.value;
    this.newRecord.createdTime = new Date();
    this.newRecord.createdBy = this.actualUser;
    this.firestoreService.addItem(this.newRecord)

    this.recordForm.reset();
  }
}
