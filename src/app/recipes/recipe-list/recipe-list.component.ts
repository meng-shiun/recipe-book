import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Cheese burger', 'Chessy and yummy', 
    'https://get.pxhere.com/photo/restaurant-dish-food-menu-recipe-fast-food-meat-bread-hamburger-sandwich-beer-cook-cheeseburger-gastronomy-slider-burgers-dining-room-appetizer-french-fries-cholesterol-junk-food-finger-food-patty-veggie-burger-breakfast-sandwich-american-food-buffalo-burger-1374894.jpg'),
    new Recipe('Pasta', 'Home made pasta', 'https://res.cloudinary.com/norgesgruppen/image/upload/c_fill,f_auto,h_574,q_80,w_945/ayzgfdbzwndgnpfwgzf9.jpg')
  ];

  constructor() { 
    console.log(this.recipes);
  }

  ngOnInit() {
  }

}
