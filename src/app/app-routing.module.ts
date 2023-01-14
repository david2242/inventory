import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InventoryListComponent} from "./pages/inventory-list/inventory-list.component";
import {AddItemComponent} from "./pages/add-item/add-item.component";

const routes: Routes = [
  {path: 'list', component: InventoryListComponent},
  {path: 'addItem', component: AddItemComponent},
  {path: '', component: InventoryListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
