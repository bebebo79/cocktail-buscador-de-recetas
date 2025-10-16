
import { useAppStore } from "../stores/useAppStore"

export default function GenerateAI() {
    // usamos notificacionde nuestro appStore 
    const showNotification = useAppStore(state => state.showNotification)
    //llamamos la funcion de generar receta de nuestro slice
    const generateRecipe = useAppStore(state => state.generateRecipe)
    // generamos la respuesta de la ia ( recipe )
    const recipe = useAppStore(state => state.recipe)
    // generamos la variable de isgenerate  
    const isGenerating = useAppStore(state=> state.isGenerating)

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    // validamos el formulario
    const form = new FormData(e.currentTarget)
    // lo que obtenemos del formulario ( campo a rellenar)
    const prompt = form.get('prompt') as string
    // comprobamos que no este vacio
    if(prompt.trim() === ''){
      showNotification({
        text : 'La Búsqueda No puede ir vacia',
        error: true
      })
      return //para cortar el flujo aqui si no tenemos nada en el formulario
    }
    await generateRecipe(prompt)

  }
  
  return (
    <>
      <h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>

      <div className="max-w-4xl mx-auto">
        <form  
          onSubmit={handleSubmit}
          className='flex flex-col space-y-3 py-10'
        >
          <div className="relative">
            <input 
              name="prompt" 
              id="prompt" 
              className="border bg-white p-4 rounded-lg w-full border-slate-800" 
              placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
            />
            <button 
              type="submit" 
              aria-label="Enviar"
              className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2
                ${isGenerating ? "cursor-not-allowed opacity-50" : "" }`}
              disabled = {isGenerating}  
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </form>

        {isGenerating && <p className="text-center">Generando...</p>}
        <div className="py-10 whitespace-pre-wrap">
          {recipe}
        </div>
      </div>

    </> 
  )
}