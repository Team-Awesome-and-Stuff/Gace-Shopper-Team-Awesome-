import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const addProductToCart = createAsyncThunk(
    'cart/addProduct',
    async ({ userId, productId }) => {
        const { data } = await axios.post(`/api/`)
    }
)

// const newQuantityAmount

// const deleteProductFromCart

// const checkoutMyCart
