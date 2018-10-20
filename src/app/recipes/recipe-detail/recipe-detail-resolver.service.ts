import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Ingredient } from "src/app/shared/ingredient.model";
import { RecipeService } from "../recipe.service";

interface Recipe {
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
}

@Injectable()
export class RecipeDetailResolver implements Resolve<Recipe> {
    constructor(private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Recipe>|Promise<Recipe>|Recipe {
        return this.recipeService.getRecipe(+route.params.id);
    }    
}