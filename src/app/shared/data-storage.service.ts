import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() { 
        const token = this.authService.token;
        const url = `https://recipe-book-ms.firebaseio.com/recipes.json?auth=${token}`;

        return this.http.put(url, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.token;
        const url = `https://recipe-book-ms.firebaseio.com/recipes.json?auth=${token}`;

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