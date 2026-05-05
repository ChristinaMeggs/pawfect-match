import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface AdoptionState {
   adoptions: Adoption[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface Adoption {
    petId: string,
    owner: string
}

const initialState : AdoptionState = {
    adoptions: [],
    status: 'idle',
    error: null,
}

export const fetchAdoptions = createAsyncThunk('adoptions/fetchAdoptions', async () => {
    const response = await fetch('http://localhost:3001/adoptions')
    if (!response.ok) throw new Error('Failed to fetch adoptions')
    return response.json() as Promise<Adoption[]>
})

export const postAdoption = createAsyncThunk('adoptions/postAdoption', async (adoption: Adoption) => {
    const response = await fetch('http://localhost:3001/adoptions',
        {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(adoption)
        })
    if (!response.ok) throw new Error('Failed to post adoptions')
    return response.json() as Promise<Adoption>
})

const adoptionsSlice = createSlice({
    name: 'adoption',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdoptions.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchAdoptions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.adoptions = action.payload
            })
            .addCase(fetchAdoptions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Something went wrong'
            })
            .addCase(postAdoption.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(postAdoption.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.adoptions.push(action.payload)
            })
            .addCase(postAdoption.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Something went wrong'
            })
    }
})

// export const {} = adoptionsSlice.actions
export default adoptionsSlice.reducer