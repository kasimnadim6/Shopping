import { Routes, RouterModule } from "@angular/router";
import { ShopingListComponent } from './shoping-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: ShopingListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
