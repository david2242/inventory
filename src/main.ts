import {enableProdMode, importProvidersFrom} from "@angular/core";
import {LOCALE_ID} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import localeHu from "@angular/common/locales/hu"

registerLocaleData(localeHu, "hu");


import {environment} from "./environments/environment";
import {AppComponent} from "./app/app.component";
import {NgxScannerQrcodeModule} from "ngx-scanner-qrcode";
import {NgxKjuaModule} from "ngx-kjua";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {withInterceptorsFromDi, provideHttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule, bootstrapApplication} from "@angular/platform-browser";
import {provideAnimations} from "@angular/platform-browser/animations";
import {AuthModule} from "@auth0/auth0-angular";
import {AppRoutingModule} from "./app/app-routing.module";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFirestoreModule, AppRoutingModule, AuthModule.forRoot(environment.authModule), BrowserModule, FormsModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatTableModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, NgxKjuaModule, NgxScannerQrcodeModule, ReactiveFormsModule),
    {
      provide: LOCALE_ID,
      useValue: "hu-HU"
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch(err => console.error(err));
