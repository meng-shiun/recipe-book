import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, mergeMap, map, withLatestFrom } from "rxjs/operators";

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducer';
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch$: Observable<Action> = this.actions$.pipe(
        ofType(RecipeActions.FETCH_RECIPES),
        switchMap((action: RecipeActions.FetchRecipes) => {
                const url = 'https://recipe-book-ms.firebaseio.com/recipes.json';
                return this.http.get<Recipe[]>(url)
            }
        ),
        map(response => {
            Object.values(response).map(recipe => {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
                return recipe;
            })
            return response;
        }),
        mergeMap(
            (data: Recipe[]) => [
                {
                    type: RecipeActions.SET_RECIPES,
                    payload: data
                }
            ]
        )
    );

    @Effect({dispatch: false})
    recipeStore$: Observable<any> = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            const url = 'https://recipe-book-ms.firebaseio.com/recipes.json';
            const req = new HttpRequest('PUT', url, state.recipes, {
                reportProgress: true
            });
            return this.http.request(req);
        })
    );

    constructor(private http: HttpClient, 
                private actions$: Actions, 
                private store: Store<fromRecipe.FeatureState>) {}
}