import express from 'express'
import cors from 'cors'
import Database from "better-sqlite3";

const app = express()
const PORT = 3001


app.use(cors())
app.use(express.json())


// --- Database setup ---
const db = new Database('pawfect.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS pets (
        id TEXT PRIMARY KEY,
        name TEXT,
        status TEXT,
        age INTEGER,
        breed TEXT,
        description TEXT,
        species TEXT,
        isFavourited INTEGER,
        imageUrl TEXT
    );

    CREATE TABLE IF NOT EXISTS adoptions (
        petId TEXT,
        owner TEXT
    );
`)

// --- Seed ---
const seedPets = () => {
    const count = db.prepare('SELECT COUNT(*) as count FROM pets').get() as { count: number }

    if (count.count === 0) {
        const insert = db.prepare(`
            INSERT INTO pets (id, name, status, age, breed, description, species, isFavourited, imageUrl)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)

        const pets = [
            { id: '1', name: 'Rosie', status: 'available', age: 3, breed: 'Shitzu', description: 'a cute little shitzu', species: 'dog', isFavourited: 1, imageUrl: '' },
            { id: '2', name: 'Scruffy', status: 'available', age: 3, breed: 'Jackie bichon', description: 'a cute old jackie bichon with a kind soul', species: 'dog', isFavourited: 1, imageUrl: '' },
            { id: '3', name: 'Tom', status: 'available', age: 10, breed: 'A tom cat', description: 'A fiesty cheeky little cat with a white strip', species: 'cat', isFavourited: 1, imageUrl: '' },
            { id: '4', name: 'Daphne', status: 'available', age: 10, breed: 'A tom cat', description: 'A fiesty cheeky little cat with a white strip', species: 'cat', isFavourited: 1, imageUrl: '' },
            { id: '5', name: 'Clark', status: 'available', age: 3, breed: 'Parrot', description: 'an talking parrot who does not shut up', species: 'bird', isFavourited: 1, imageUrl: '' },
        ]

        for (const pet of pets) {
            insert.run(pet.id, pet.name, pet.status, pet.age, pet.breed, pet.description, pet.species, pet.isFavourited, pet.imageUrl)
        }

        console.log('Database seeded with initial pets')
    }
}

seedPets()


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


const adoptions: Adoption[] = []

app.get('/pets', (req, res) => {
    const pets = db.prepare('SELECT * FROM pets').all() as Pet[]
    res.json(pets.map(pet => ({ ...pet, isFavourited: Boolean(pet.isFavourited) })))
})

app.get('/pets/:id', (req, res) => {
    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(req.params.id) as Pet | undefined
    if (!pet) return res.status(404).json({ message: 'Pet not found' })
    res.json({ ...pet, isFavourited: Boolean(pet.isFavourited) })
})

// --- Adoption routes ---
app.get('/adoptions', (req, res) => {
    const adoptions = db.prepare('SELECT * FROM adoptions').all() as Adoption[]
    res.json(adoptions)
})

app.post('/adoptions', (req, res) => {
    const { petId, owner } = req.body

    const pet = db.prepare('SELECT * FROM pets WHERE id = ?').get(petId) as Pet | undefined
    if (!pet) return res.status(404).json({ message: 'Pet not found' })
    if (pet.status === 'adopted') return res.status(400).json({ message: 'Pet already adopted' })

    db.prepare('UPDATE pets SET status = ? WHERE id = ?').run('adopted', petId)
    db.prepare('INSERT INTO adoptions (petId, owner) VALUES (?, ?)').run(petId, owner)

    res.status(201).json({ petId, owner })
})


// --- Health check ---
app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})