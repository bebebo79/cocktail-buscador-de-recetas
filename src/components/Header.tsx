import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useMemo, useState, ChangeEvent, FormEvent} from "react"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
  // creamos location para ver en que url estamos
  const {pathname} = useLocation()
  
  // detectamos si estamos en la pag. pricipal
  const isHome = useMemo(()=> pathname ==='/',[pathname])
  
  //configuramos el state de categorias llamando a la funcion
  const fetchCategories = useAppStore((state)=>state.fetchCategories)
  const categories = useAppStore((state)=>state.categories)
  const searchRecipes = useAppStore((state)=>state.searchRecipes)
  const showNotification = useAppStore((state)=>state.showNotification)
  
  // generamos el state de los datos que introducimos en el formulario
  const [searchFilters, setSearchFilters] = useState({
        ingredient : '',
        category :''
  })


  useEffect(() => {
    fetchCategories()
  }, [])
  

  //funcion para guardar el state
  const handlerChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> )=> {
    setSearchFilters({
        ...searchFilters,
        [e.target.name] : e.target.value
    })
  }
  //funcion para validar que esten los campos rellenos
  const handlerSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    //TODO validamos
    if(Object.values(searchFilters).includes('')) {
       showNotification({
        text :'Todos los campos son obligatorios',
        error : true
       })
    
        return
    }
    searchRecipes(searchFilters)
    



  }

  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800' }>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32"src="/logo.svg" alt="Logo" />
                </div>
                <nav className="flex gap-4">
                    <NavLink to={'/'} 
                              className={({isActive}) =>
                              isActive ? 'uppercase font-bold text-orange-500' : 'uppercase font-bold text-white'}>
                              Inicio
                    </NavLink>
                    <NavLink to={'/favoritos'} 
                    className={({isActive}) =>isActive ? 'uppercase font-bold text-orange-500' : 'uppercase font-bold text-white'}>
                              Favoritos
                    </NavLink>
                    <NavLink to={'/generate'} 
                    className={({isActive}) =>isActive ? 'uppercase font-bold text-orange-500' : 'uppercase font-bold text-white'}>
                              Generar con IA
                    </NavLink>

                </nav>
            </div>

            {isHome&& (
                <form className="md:w-1/2 2xl:w-1/3 my-32 bg-orange-400 rounded-lg shadow p-10 space-y-6"
                        onSubmit={handlerSubmit}>
                    <div className="space-y-4">
                        <label htmlFor="ingredient" className="text-white uppercase text-lg font-extrabold">Nombre o Ingrediente</label>
                    
                        <input type="text" 
                            id="ingredient" 
                            name="ingredient" 
                            placeholder="Ej. Ron, Mojito, Tequila..."
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handlerChange}
                            value={searchFilters.ingredient}/>
                    </div>
                    <div className="space-y-4">
                        <label htmlFor="category" className="text-white uppercase text-lg font-extrabold">Categoría:</label>
                    
                        <select
                            id="category" 
                            name="category" 
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handlerChange}
                            value={searchFilters.category}
                            
                            >
                            <option value="">--Selecciona---</option>
                            {categories.drinks.map(category => (
                                <option value={category.strCategory} key={category.strCategory}>{category.strCategory}</option>
                            ))}
                                
                        </select>
                    </div>
                    <input type="submit" 
                            value="Buscar Recetas" 
                            className="cursor-pointer bg-orange-800 hover:bg-orange-700 text-white p-5 rounded-lg uppercase font-extrabold w-full"/>        
                </form>
            )}
            
        </div>
        
        

    </header>
  )
}
  