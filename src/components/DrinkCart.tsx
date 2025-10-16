
import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"



export type DrinkCartProop = {
    drink : Drink
}

export default function DrinkCart ({drink} : DrinkCartProop) {

  const selectRecipe = useAppStore((state)=>state.selectRecipe)


  return (
    <div className="shadow-lg border ">
      <div className="overflow-hidden">
        <img src={drink.strDrinkThumb} 
              alt={`imagen ${drink.strDrink}`}
              className="hover:scale-105 transition-transform hover:rotate-2" />

      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button type="button" 
                className="bg-orange-400 hover:bg-orange-500 w-full p-4 my-3 text-white font-bold text-lg rounded-lg"
                onClick={()=>selectRecipe(drink.idDrink)}>

        Ver Receta</button>
      </div>
        
    </div>
  )
}
