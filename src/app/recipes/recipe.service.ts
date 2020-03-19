import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shoping-list/store/shopping-list.action';
import * as fromApp from '../../app/store/app.reducer';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeList: Recipe[] = [];

  recipeChanges = new Subject<Recipe[]>();
  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  getRecipes() {
    return this.recipeList;
  }

  getRecipeById(index: number) {
    return this.recipeList[index];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredient));
  }

  addRecipe(recipe: Recipe) {
    this.recipeList.push(recipe);
    this.recipeChanges.next(this.recipeList);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipeList[index] = newRecipe;
    this.recipeChanges.next(this.recipeList);
  }

  deleteRecipe(index: number) {
    this.recipeList.splice(index, 1);
    this.recipeChanges.next(this.recipeList);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipeList = recipes;
    this.recipeChanges.next(this.recipeList);
  }
}
