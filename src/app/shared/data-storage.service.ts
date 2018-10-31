import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

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

        this.http.get(url)
            .pipe(
                map(response => {
                    Object.values(response).map(recipe => {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                        return recipe
                    })
                    // console.log(response);
                    return response;
                })
            )
            .subscribe(
                (recipes: Recipe[]) => this.recipeService.setRecipes(recipes)
            );
    }
}