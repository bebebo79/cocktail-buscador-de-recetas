import { create } from "zustand" 
import { createRecipesSline, RecipesSlineType } from "./recipeSlice"
import { devtools} from "zustand/middleware"
import {createFavoritesSline, FavoritesSlineType} from "./favoritesSlice"
import {createNotificationSline, notificationSlineType} from "./notificationSlice"
import { AISlice, createAISlice } from "./aiSlice"

//devtools es para abrir el redux y poder verlo desde las tools

export const useAppStore = create<RecipesSlineType & FavoritesSlineType & notificationSlineType & AISlice>()(devtools((...a)=>({
    ...createRecipesSline(...a),
    ...createFavoritesSline(...a),
    ...createNotificationSline(...a),
    ...createAISlice(...a)
})))