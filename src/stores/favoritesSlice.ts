import {StateCreator} from 'zustand'
import { Recipe } from '../types'
import { createRecipesSline, RecipesSlineType } from './recipeSlice'
import { createNotificationSline, notificationSlineType } from './notificationSlice'




export type FavoritesSlineType = {
    favorites : Recipe[]
    handlerClickFavorites : (recipe : Recipe)=>void
    favoriteExist : (id: Recipe['idDrink']) =>boolean
    loadFromStorage: () => void
   
}


export const createFavoritesSline : StateCreator<FavoritesSlineType & RecipesSlineType & notificationSlineType, [],[], FavoritesSlineType> = (set, get, api)=>({
    favorites : [],
    handlerClickFavorites(recipe) {
       if(get().favoriteExist(recipe.idDrink)){
            set((state)=>({
                favorites : state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSline(set, get, api).showNotification({
                text:'Se Elminó de Favoritos',
                error:false
            })
        }else {
            set((state)=>({
                favorites : [...state.favorites ,recipe],
                
            }))
            createNotificationSline(set,get,api).showNotification({
                text : 'Guardado en Favoritos',
                error: false
            })
       }
       createRecipesSline(set,get,api).closeModal()
       localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id)=> {
        return get().favorites.some(favorite => favorite.idDrink === id)

    },
    loadFromStorage : ()=>{
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites : JSON.parse(storedFavorites)
            })
        }
    }   
})