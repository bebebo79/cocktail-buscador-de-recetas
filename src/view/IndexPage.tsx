
import DrinkCart from "../components/DrinkCart"
import { useAppStore } from "../stores/useAppStore"
import { useMemo } from "react"

export default function IndexPage() {

  const drinks =useAppStore((state)=>state.drinks)
  const hasDrinks = useMemo(()=> drinks.drinks.length ,[drinks])

  return (
    <>
     <h1 className="text-6xl font-extrabold mb-7">Recetas</h1>

     {hasDrinks ? (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10 gap-10">
        {drinks.drinks.map((drink)=>(
          <DrinkCart
            key={drink.idDrink}
            drink={drink}
          />
        ))}
      </div>
      
     ) : (
      <>
        <p className="py-8 text-center font-bold text-2xl">Aún no hay resultado, rellenar el formulario para comprobar si hay recetas</p>
      </>
     )}
     
    </>

  )
}
