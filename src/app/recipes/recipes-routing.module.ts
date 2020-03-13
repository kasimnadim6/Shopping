import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '', component: RecipesComponent,
        canActivate: [AuthGuard],
        children:
            [
                { path: '', component: RecipeStartComponent },
                { path: 'new', component: RecipesEditComponent },
                { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverService] },
                { path: ':id/edit', component: RecipesEditComponent, resolve: [RecipesResolverService] }
            ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }
