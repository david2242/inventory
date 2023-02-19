import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {City, Item} from "../../models/item.model";
import {User} from "../../models/user.model";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {ActivatedRoute} from "@angular/router";


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

  private actualRecord: Item = {
    name: '',
    city: City.SAREGRES,
    room: '',
    description: '',
    createdTime: new Date(), //TODO valamiért csak nanosec és sec mezők mentődnek el - mert ez nem date hanem Timestamp
    createdBy: {
      firstName: '',
      lastName: '',
      role: ''
    }
  };

  editMode: boolean = false;
  private id: any;

  constructor(private firestoreService: FirestoreCrudService, private route: ActivatedRoute) {

  }

  //TODO: Ez mi a szar
  public recordForm = new UntypedFormGroup({
    customID: new UntypedFormControl({value: '', disabled: true}),
    name: new UntypedFormControl(''),
    city: new UntypedFormControl(''),
    room: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
  }) //TODO: Validator

  getItem() {
      this.firestoreService.getItem(this.id).subscribe((data: any) => console.log(data));
  };

  myObserver = {
    next: (data: any) => {
      this.actualRecord = data;
      this.recordForm.patchValue({
        customID: this.id,
        name: data.name,
        city: data.city,
        room: data.room,
        description: data.description,
      });
    },
    error: (err: any) => console.error(err),
    complete: () => console.log('Observer got a complete notification')
  };

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.editMode = true;
      this.firestoreService.getItem(this.id).subscribe(this.myObserver)
    }
  }

  addItem() {
    this.actualRecord = this.recordForm.value;
    this.actualRecord.createdTime = new Date();
    this.actualRecord.createdBy = this.actualUser;
    this.firestoreService.addItem(this.actualRecord)
      .then(() => console.log('Successfully added item: ' + this.actualRecord))
      .catch((err) => console.error(err));
    this.recordForm.reset();
  }

  editItem() {
    this.actualRecord = this.recordForm.value;
    this.actualRecord.modifiedTime = new Date();
    this.actualRecord.modifiedBy = this.actualUser;
    this.firestoreService.updateItem(this.id, this.actualRecord)
      .then(() => console.log('succesfully updated ' + this.actualRecord.name))
      .catch((err: any) => console.error(err));
  }
}
