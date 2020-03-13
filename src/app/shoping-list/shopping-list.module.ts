import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopingListComponent } from './shoping-list.component';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { RouterModule } from '@angular/router';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShopingListComponent,
    ShopingEditComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    ShoppingListRoutingModule
  ],
  exports: [
    ShopingListComponent,
    ShopingEditComponent
  ]
})
export class ShoppingListModule { }
