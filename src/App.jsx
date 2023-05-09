import { Routes, Route } from "react-router-dom"
import FetchNews from "./components/FetchNews"
import Item from "./components/Item"

export default function App() {
  return (
    <>
                      <Routes>
                        <Route path="/" element={<FetchNews />} />
                        <Route path='/Item/:id' element={<Item />}/>
                      </Routes>
    </>
  )
}



