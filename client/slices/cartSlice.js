import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const addProductToCart = createAsyncThunk(
    'cart/addProduct',
    async ({ userId }) => {
        try {
            const { data } = await axios.get(`/api/orders/${userId}`)
            return data
        } catch (err) {
            console.log(err)
        }
    }
)

// const newQuantityAmount
const newQuantitiyAmount = createAsyncThunk(
    'cart/newQuantitiyAmount',
    async ({ userId }) => {
        try {
            const { data } = await axios.post(`/api/orders/${userId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

// const deleteProductFromCart
const deleteProductFromCart = createAsyncThunk(
    'cart/deleteProduct',
    async ({ userId }) => {
        try {
            const { data } = await axios.delete(`/api/orders/${userId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

// const checkoutMyCart
const checkoutMyCart = createAsyncThunk(
    'cart/checkoutMyCart',
    async ({ userId }) => {
        try {
            const { data } = await axios.post(`/api/orders/${userId}`)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.push(action.payload)
                return state
            })
            .addCase(newQuantitiyAmount.fulfilled, (state, action) => {
                state = action.payload
                return state
            })
            .addCase(deleteProductFromCart.fulfilled, (state, action) => {
                state.slice(action.payload)
                return state
            })
            .addCase(checkoutMyCart.fulfilled, (state, action) => {
                state.slice(action.payload)
                return state
            })
    },
})

export default cartSlice.reducer
