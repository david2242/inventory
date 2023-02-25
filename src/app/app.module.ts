import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddItemComponent} from './pages/add-item/add-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InventoryListComponent} from './pages/inventory-list/inventory-list.component';
import {HttpClientModule} from "@angular/common/http";
import {environment} from '../environments/environment.prod';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {ScannerComponent} from "./components/scanner/scanner.component";
import {ItemCardComponent} from './components/item-card/item-card.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxKjuaModule} from 'ngx-kjua';
import { QrGenerateComponent } from './pages/qr-generate/qr-generate.component';


@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    InventoryListComponent,
    ScannerComponent,
    ItemCardComponent,
    QrGenerateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ZXingScannerModule,
    FormsModule,
    MatDialogModule,
    NgxKjuaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
