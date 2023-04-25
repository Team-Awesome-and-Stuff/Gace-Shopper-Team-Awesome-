import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSingleProduct = createAsyncThunk(
    'singleProduct/fetch',
    async (id) => {
        try {
            const { data } = await axios.get(`/api/products/${id}`)
            return data
        } catch (error) {
            next(error)
        }
    }
)

const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default singleProductSlice.reducer
