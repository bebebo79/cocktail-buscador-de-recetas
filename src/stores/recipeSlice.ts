import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipeById } from "../services/RecipesService"
import { Categories, SearchFilter, Drinks, Drink, Recipe } from "../types"
import { FavoritesSlineType } from "./favoritesSlice"


export type RecipesSlineType = {
    categories : Categories,
    drinks : Drinks,
    selectedRecipe : Recipe,
    modal:boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>,
    selectRecipe: (id:Drink['idDrink']) => Promise<void>,
    closeModal : ()=>Promise<void>
    
   
    
}


export const createRecipesSline : StateCreator<RecipesSlineType & FavoritesSlineType, [],[], RecipesSlineType> = (set) =>({
    categories : {
        drinks : []
    },
    drinks : {
        drinks : []
    },
    selectedRecipe : {} as Recipe,
    modal:false,

    fetchCategories : async()=>{
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async(filter)=> {
        const drinks = await getRecipes(filter)
        set({
            drinks
        })
        
    },
    selectRecipe : async(id)=>{
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal:true
        })

    },
    closeModal : async() => {
        set({
            modal:false,
            selectedRecipe : {} as Recipe
        })
    }
}) 