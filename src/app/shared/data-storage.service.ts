import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeSvc: RecipeService,
    private auth: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeSvc.getRecipes();
    return this.http.put('https://shopping-site-eb2c7.firebaseio.com/recipes.json', recipes)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://shopping-site-eb2c7.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
          this.recipeSvc.setRecipes(recipes);
        })
      );
  }
}
