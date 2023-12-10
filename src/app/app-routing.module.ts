import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {InventoryListComponent} from "./pages/inventory-list/inventory-list.component";
import {AddItemComponent} from "./pages/add-item/add-item.component";
import {QrGenerateComponent} from "./pages/qr-generate/qr-generate.component";
import {authGuardGuard} from "./auth-guard.guard";

const routes: Routes = [
  {path: "list", component: InventoryListComponent, canActivate: [authGuardGuard]},
  {path: "addItem", component: AddItemComponent, canActivate: [authGuardGuard]},
  {path: "item/:id", component: AddItemComponent, canActivate: [authGuardGuard]},
  {path: "qrgenerate", component: QrGenerateComponent, canActivate: [authGuardGuard]},
  {path: "", component: InventoryListComponent, canActivate: [authGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
