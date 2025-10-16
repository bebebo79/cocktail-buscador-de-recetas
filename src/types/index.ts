import {z} from 'zod'
import { CategoryApiResponsiveSchema, DrinkAPIResponsive, DrinksAPIResponsive, RecipeAPIResponseSchema, SearchFilterRecipesSchema } from '../utils/recipes-schema'


export type Categories = z.infer<typeof CategoryApiResponsiveSchema>
export type SearchFilter = z.infer<typeof SearchFilterRecipesSchema>
export type Drinks = z.infer<typeof DrinksAPIResponsive>
export type Drink = z.infer<typeof DrinkAPIResponsive>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>