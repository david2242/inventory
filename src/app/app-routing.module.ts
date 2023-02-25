import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventoryListComponent} from "./pages/inventory-list/inventory-list.component";
import {AddItemComponent} from "./pages/add-item/add-item.component";
import {QrGenerateComponent} from "./pages/qr-generate/qr-generate.component";

const routes: Routes = [
  {path: 'list', component: InventoryListComponent},
  {path: 'addItem', component: AddItemComponent},
  {path: 'item/:id', component: AddItemComponent},
  {path: 'qrgenerate', component: QrGenerateComponent},
  {path: '', component: InventoryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
