import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shoping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeList: Recipe[] = [];

  // private recipeList: Recipe[] = [
  //   new Recipe('Sample Recipe One', 'This is the description of Recipe one',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEJCGuiWhJZPkqISCfLgl9902l0lWnLRwx9OFnfrz-s5I82hAog&s',
  //     [new Ingredient('Tomato', 3),
  //     new Ingredient('Orange', 10)]),
  //   new Recipe('Sample Recipe Two', 'This is the description of Recipe two',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEJCGuiWhJZPkqISCfLgl9902l0lWnLRwx9OFnfrz-s5I82hAog&s',
  //     [new Ingredient('Tomato', 3),
  //     new Ingredient('Orange', 10)]),
  //   new Recipe('Sample Recipe Three', 'This is the description of Recipe three',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEJCGuiWhJZPkqISCfLgl9902l0lWnLRwx9OFnfrz-s5I82hAog&s',
  //     [new Ingredient('Tomato', 3),
  //     new Ingredient('Orange', 10)])
  // ];

  recipeChanges = new Subject<Recipe[]>();
  constructor(private shoppingListSvc: ShoppingListService) { }

  getRecipes() {
    return this.recipeList;
  }

  getRecipeById(index: number) {
    return this.recipeList[index];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListSvc.addIngredients(ingredient);
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
