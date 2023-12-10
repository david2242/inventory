import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {InventoryListComponent} from "./pages/inventory-list/inventory-list.component";
import {authGuardGuard} from "./auth-guard.guard";

const routes: Routes = [
  {path: "list", component: InventoryListComponent, canActivate: [authGuardGuard]},
  {path: "addItem", canActivate: [authGuardGuard], loadComponent: () => import("./pages/add-item/add-item.component").then(m => m.AddItemComponent)},
  {path: "item/:id", canActivate: [authGuardGuard], loadComponent: () => import("./pages/add-item/add-item.component").then(m => m.AddItemComponent)},
  {path: "qrgenerate", canActivate: [authGuardGuard], loadComponent: () => import("./pages/qr-generate/qr-generate.component").then(m => m.QrGenerateComponent)},
  {path: "", component: InventoryListComponent, canActivate: [authGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
