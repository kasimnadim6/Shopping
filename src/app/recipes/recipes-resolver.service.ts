import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})

export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataStorageSvc: DataStorageService,
        private recipeSvc: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeSvc.getRecipes();
        if (recipes.length === 0) {
            return this.dataStorageSvc.fetchRecipes();
        } else {
            return recipes;
        }
    }

}
