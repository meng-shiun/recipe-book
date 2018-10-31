import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() { 
        const url = 'https://recipe-book-ms.firebaseio.com/recipes.json';

        return this.http.put(url, this.recipeService.getRecipes());
    }

    getRecipes() {
        const url = 'https://recipe-book-ms.firebaseio.com/recipes.json';

        this.http.get(url).subscribe(
            recipes => this.recipeService.setRecipes(recipes)
        );
    }
}