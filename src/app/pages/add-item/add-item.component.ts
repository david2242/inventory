import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {City, Item} from "../../models/item.model";
import {User} from "../../models/user.model";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {ActivatedRoute} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  private actualUser: User = {
    firstName: 'Katalin',
    lastName: 'Nagy',
    role: 'vezető'
  }

  private actualRecord: Item = {
    name: '',
    customID: undefined,
    city: City.CECE,
    room: '',
    description: '',
    createdTime: '',
    createdBy: {
      firstName: '',
      lastName: '',
      role: ''
    },
    active: true
  }

  editMode = false;
  private id: string | null = null;

  constructor(
    private firestoreService: FirestoreCrudService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) {

  }

  public recordForm = new FormGroup({
    customID: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    name: new FormControl<string>('', {nonNullable: true}),
    city: new FormControl<City>(City.CECE, {nonNullable: true}),
    room: new FormControl<string>('', {nonNullable: true}),
    description: new FormControl<string>('', {nonNullable: true}),
    active: new FormControl<boolean>(true, {nonNullable: true}),
  })

  getItem() {
      this.firestoreService.getItem(this.id).subscribe((data: any) => console.log(data));
  };

  myObserver = {
    next: (data: Item | undefined) => {
      if (data) {
          this.recordForm.patchValue({
            customID: data.customID,
            name: data.name,
            city: data.city,
            room: data.room,
            description: data.description,
          });
        } else console.warn("Such item doesn't exists in inventory!");
    },
    error: (err: Error) => console.error(err),
    complete: () => console.log('Observer got a complete notification')
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.editMode = true;
      this.firestoreService.getItem(this.id).subscribe(this.myObserver)
    }
  }

  addItem() {
    this.actualRecord = this.recordForm.getRawValue();
    this.actualRecord.createdTime = new Date().toLocaleString();
    this.actualRecord.createdBy = this.actualUser;
    this.firestoreService.addItem(this.actualRecord)
      .then(() => {
        this._snackBar.open(`Sikeresen hozzáadtad: ${this.actualRecord.name}`, 'Ok',{
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      })
      .catch((err) => console.error(err));
    this.recordForm.reset();
  }

  editItem() {
    if (!this.editMode || !this.id) {
      return;
    }
    this.actualRecord = this.recordForm.getRawValue();
    this.actualRecord.modifiedTime = new Date().toLocaleString();
    this.actualRecord.modifiedBy = this.actualUser;
    this.firestoreService.updateItem(this.id, this.actualRecord)
      .then(() => {
        this._snackBar.open(`Sikeresen módosítottad: ${this.actualRecord.name}`, 'Ok',{
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      })
      .catch((err) => console.error(err));
  }
}
