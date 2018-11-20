import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = +params.get('id');
        this.editMode = params.get('id') != null;
        this.initForm();
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    const { name, description, imagePath, ingredients } = this.recipeForm.value;
    const newRecipe = new Recipe(name, description, imagePath, ingredients);

    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({id: this.id, recipe: newRecipe}));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
    }

    this.onCancel();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onAddIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.pipe(
        select('recipes'),
        take(1)
      ).subscribe(
        (recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
      
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
    
          if (recipe.ingredients) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        }
      )
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

}
