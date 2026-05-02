import { Routes, Route } from 'react-router-dom'
import HomePage from "./features/pets/HomePage.tsx";
import PetPage from "./features/pets/PetPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pet/:id" element={<PetPage/>}/>
        </Routes>
    )
}

export default App
