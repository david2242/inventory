import {Component, OnInit} from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {City, Item} from "../../models/item.model";
import {FirestoreCrudService} from "../../services/firestore-crud.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgIf } from "@angular/common";


@Component({
    selector: "app-add-item",
    templateUrl: "./add-item.component.html",
    styleUrls: ["./add-item.component.scss"],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule]
})
export class AddItemComponent implements OnInit {

  private actualUser?: string;

  private actualRecord: Item = {
    name: "",
    customID: undefined,
    city: City.CECE,
    room: "",
    description: "",
    createdTime: 0,
    createdBy: "",
    active: true
  }

  editMode = false;
  private id: string | null = null;

  constructor(
    private firestoreService: FirestoreCrudService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private user: UserService) {
  }

  public recordForm = new FormGroup({
    customID: new FormControl<string | undefined>(undefined, {nonNullable: true}),
    name: new FormControl<string>("", {nonNullable: true}),
    city: new FormControl<City>(City.CECE, {nonNullable: true}),
    room: new FormControl<string>("", {nonNullable: true}),
    description: new FormControl<string>("", {nonNullable: true}),
    active: new FormControl<boolean>(true, {nonNullable: true}),
  })

  formPatcher = {
    next: (data: Item | undefined) => {
      if (data) {
          this.recordForm.patchValue({
            customID: data.customID,
            name: data.name,
            city: data.city,
            room: data.room,
            description: data.description,
          });
        } else {
        this._snackBar.open("Hiba az elem lehívása során", "", {
          horizontalPosition: "center",
          verticalPosition: "top"
        })
      }
    },
    error: (err: Error) => console.error(err),
  }

  ngOnInit(): void {
    this.user.loggedInUser$.subscribe(user => this.actualUser = user)
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.editMode = true;
      this.firestoreService.getItem(this.id).subscribe(this.formPatcher)
    }
  }

  addItem() {
    this.actualRecord = this.recordForm.getRawValue();
    this.actualRecord.createdTime = Date.now();
    this.actualRecord.createdBy = this.actualUser ? this.actualUser : "";
    this.firestoreService.addItem(this.actualRecord)
      .then(() => {
        this._snackBar.open(`Sikeresen hozzáadtad: ${this.actualRecord.name}`, "Ok",{
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
    this.actualRecord.modifiedTime = Date.now();
    this.actualRecord.modifiedBy = this.actualUser;
    this.firestoreService.updateItem(this.id, this.actualRecord)
      .then(() => {
        this._snackBar.open(`Sikeresen módosítottad: ${this.actualRecord.name}`, "Ok",{
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      })
      .catch((err) => console.error(err));
  }
}
