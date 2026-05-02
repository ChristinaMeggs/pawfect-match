import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilterState, Pet } from '../../types';

interface PetsState {
    items: Pet[];
    filters: FilterState;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PetsState = {
    items: [],
    filters: { species: 'all', maxAge: null, availableOnly: false },
    status: 'idle',
    error: null,
};

// --- Thunks ---
export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
    const response = await fetch('http://localhost:3001/pets')
    if (!response.ok) throw new Error('Failed to fetch pets')
    return response.json() as Promise<Pet[]>
})

export const fetchPetById = createAsyncThunk('pets/fetchPetById', async (id: string) => {
    const response = await fetch(`http://localhost:3001/pets/${id}`)
    if (!response.ok) throw new Error('Failed to fetch pet')
    return response.json() as Promise<Pet>
})

// --- Slice ---
const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        toggleFavourite(state, action: PayloadAction<string>) {
            const pet = state.items.find(p => p.id === action.payload);
            if (pet) pet.isFavourited = !pet.isFavourited;
        },
        setSpeciesFilter(state, action: PayloadAction<FilterState['species']>) {
            state.filters.species = action.payload;
        },
        setAvailableOnly(state, action: PayloadAction<boolean>) {
            state.filters.availableOnly = action.payload;
        },
        setPetAsAdopted(state, action: PayloadAction<string>) {
            const pet = state.items.find(p => p.id === action.payload);
            if (pet) pet.status = 'adopted';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPets.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchPets.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchPets.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Something went wrong'
            })
            .addCase(fetchPetById.fulfilled, (state, action) => {
                const exists = state.items.find(p => p.id === action.payload.id)
                if (!exists) {
                    state.items.push(action.payload)
                }
            })
    }
});

export const { toggleFavourite, setSpeciesFilter, setAvailableOnly, setPetAsAdopted } = petsSlice.actions;
export default petsSlice.reducer;