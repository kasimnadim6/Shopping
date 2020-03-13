import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {

  ingredients: Ingredient[];
  private subscription = new Subject();
  constructor(private shoppingListSvc: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListSvc.getIngredients();
    this.shoppingListSvc.onIngredientChanges.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onEditItem(index: number) {
    this.shoppingListSvc.startEditing.next(index);
  }
}
