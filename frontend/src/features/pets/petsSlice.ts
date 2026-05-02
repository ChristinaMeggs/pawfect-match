import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {FilterState, Pet} from '../../types';
import {petInitialData} from "./petInitialData.ts";

interface PetsState {
    items: Pet[];
    filters: FilterState;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PetsState = {
    items: petInitialData,
    filters: { species: 'all', maxAge: null, availableOnly: false },
    status: 'idle',
    error: null,
};


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
});

export const { toggleFavourite, setSpeciesFilter, setAvailableOnly, setPetAsAdopted } = petsSlice.actions;
export default petsSlice.reducer;