import { StateCreator } from "zustand";
import AIService from "../services/AIService";


export type AISlice = {
    recipe : string,
    isGenerating : boolean,
    generateRecipe : (prompt : string) => Promise<void>
}

export const createAISlice : StateCreator<AISlice, [],[], AISlice>  = (set)=>({
    recipe : '',
    isGenerating : false,
    generateRecipe : async (prompt) =>{
        const data = await AIService.generateRecipe(prompt)
        // necesitamos limpiar antes de cada consulta
        set({recipe : '', isGenerating : true})
        // usamos un for await para ir dando respuesta poco a poco
        for await ( const textPart of data) {
            set((state => ({
                recipe : state.recipe + textPart
            })))
        }
        set({isGenerating:false})
        
    }
})