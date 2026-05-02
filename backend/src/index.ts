import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001


app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})


// --- Types ---
interface Pet {
    id: string
    name: string
    status: 'available' | 'adopted'
    age: number
    breed: string
    description: string
    species: 'dog' | 'cat' | 'bird'
    isFavourited: boolean
    imageUrl: string
}

interface Adoption {
    petId: string
    owner: string
}

// --- In-memory data ---
const pets: Pet[] = [
    { id: '1', name: 'Rosie', status: 'available', age: 3, breed: 'Shitzu', description: 'a cute little shitzu', species: 'dog', isFavourited: true, imageUrl: '' },
    { id: '2', name: 'Scruffy', status: 'available', age: 3, breed: 'Jackie bichon', description: 'a cute old jackie bichon with a kind soul', species: 'dog', isFavourited: true, imageUrl: '' },
    { id: '3', name: 'Tom', status: 'available', age: 10, breed: 'A tom cat', description: 'A fiesty cheeky little cat with a white strip', species: 'cat', isFavourited: true, imageUrl: '' },
    { id: '4', name: 'Daphne', status: 'available', age: 10, breed: 'A tom cat', description: 'A fiesty cheeky little cat with a white strip', species: 'cat', isFavourited: true, imageUrl: '' },
    { id: '5', name: 'Clark', status: 'available', age: 3, breed: 'Parrot', description: 'an talking parrot who does not shut up', species: 'bird', isFavourited: true, imageUrl: '' },
]

const adoptions: Adoption[] = []

app.get('/pets', (req, res) => {
    res.json(pets)
})

app.get('/pets/:id', (req, res) => {
    const pet = pets.find(p => p.id === req.params.id)
    if (!pet) return res.status(404).json({ message: 'Pet not found' })
    res.json(pet)
})

// --- Adoption routes ---
app.get('/adoptions', (req, res) => {
    res.json(adoptions)
})

app.post('/adoptions', (req, res) => {
    const { petId, owner } = req.body

    const pet = pets.find(p => p.id === petId)
    if (!pet) return res.status(404).json({ message: 'Pet not found' })
    if (pet.status === 'adopted') return res.status(400).json({ message: 'Pet already adopted' })

    pet.status = 'adopted'
    adoptions.push({ petId, owner })

    res.status(201).json({ petId, owner })
})


// --- Health check ---
app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})