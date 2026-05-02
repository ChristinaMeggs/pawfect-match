import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AdoptionState {
   adoptions: Adoption[]
}

interface Adoption {
    petId: string,
    owner: string
}

const initialState : AdoptionState = {
    adoptions: []
}

const adoptionsSlice = createSlice({
    name: 'adoption',
    initialState: initialState,
    reducers: {
        adoptAPet(state, action: PayloadAction<{id: string, ownerName: string}>) {
            state.adoptions.push({petId: action.payload.id, owner: action.payload.ownerName})
        }
    }
})

export const {adoptAPet} = adoptionsSlice.actions
export default adoptionsSlice.reducer