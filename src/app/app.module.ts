import {LOCALE_ID, NgModule} from "@angular/core";
import {environment} from "../environments/environment";

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "@auth0/auth0-angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxKjuaModule} from "ngx-kjua";
import {NgxScannerQrcodeModule} from "ngx-scanner-qrcode";

import {AppComponent} from "./app.component";
import {AddItemComponent} from "./pages/add-item/add-item.component";
import {InventoryListComponent} from "./pages/inventory-list/inventory-list.component";
import {ItemCardComponent} from "./components/item-card/item-card.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ScannerComponent} from "./components/scanner/scanner.component";
import {QrGenerateComponent} from "./pages/qr-generate/qr-generate.component";

@NgModule({
  declarations: [
    AppComponent,
    AddItemComponent,
    InventoryListComponent,
    ItemCardComponent,
    NavbarComponent,
    ScannerComponent,
    QrGenerateComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule.forRoot(environment.authModule),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    NgxKjuaModule,
    NgxScannerQrcodeModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "hu-HU"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
