import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Item} from "../../models/item.model";
import {User} from "../../models/user.model";


@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

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

  constructor() { }

  public recordForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    room: new FormControl(''),
    description: new FormControl(''),
  }) //TODO: Validator

  ngOnInit(): void {
  }

  onSubmit() {
    this.newRecord = this.recordForm.value;
    this.newRecord.createdTime = new Date();
    this.newRecord.createdBy = this.actualUser;
    console.log(this.newRecord);
    this.recordForm.reset();
  }
}
