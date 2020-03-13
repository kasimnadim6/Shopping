import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeSvc: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializationForm();
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
    });
    if (this.editMode) {
      this.recipe = this.recipeSvc.getRecipeById(this.id);
      this.recipeForm.controls.name.setValue(this.recipe.name);
      this.recipeForm.controls.imagePath.setValue(this.recipe.imagePath);
      this.recipeForm.controls.description.setValue(this.recipe.description);

      if (this.recipe.ingredients.length) {
        for (const ingredient of this.recipe.ingredients) {
          this.ingredientArray.push(
            this.fb.group({
              name: [ingredient.name, Validators.required],
              amount: [ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
            }));
        }
      }

    }
  }

  get ingredientArray() { return this.recipeForm.controls.ingredients as FormArray; }

  private initializationForm() {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      imagePath: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([])
    });
  }

  addNewIngredient() {
    this.ingredientArray.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
      }));
  }

  onDelete(index: number) {
    this.ingredientArray.removeAt(index);
  }

  submit() {
    this.editMode ? this.recipeSvc.updateRecipe(this.id, this.recipeForm.value) : this.recipeSvc.addRecipe(this.recipeForm.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
