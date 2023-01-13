import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddRecordComponent} from './pages/add-record/add-record.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InventoryListComponent} from './pages/inventory-list/inventory-list.component';
import {HttpClientModule} from "@angular/common/http";
// import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
// import {provideAuth, getAuth} from '@angular/fire/auth';
// import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    AddRecordComponent,
    InventoryListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore())
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
