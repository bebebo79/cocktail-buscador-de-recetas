import {lazy,Suspense} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import GenerateAI from "./view/GenerateAI"

const IndexPage = lazy(()=>import('./view/IndexPage'))
const FavoritiesPage = lazy(()=>import('./view/FavoritiesPage'))



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={
            <Suspense fallback="Cargando...">
              <IndexPage/>
            </Suspense>
          }/>
          <Route path="/favoritos" element={
            <Suspense fallback="Cargando...">
              <FavoritiesPage />
            </Suspense>
          }/>
          <Route path="/generate" element={
            <Suspense fallback="Cargando...">
              <GenerateAI />
            </Suspense>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
