import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Async Thunks
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }) => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            })
            const token = response.data.token
            // set the cookie received from the backend
            document.cookie = `auth=${token}; Secure; HttpOnly; SameSite=Strict;`
            const user = response.data.user
            return { user, token }
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
)

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }) => {
    const response = await signUpUser(email, password)
    if (response?.data?.token) {
      // set the cookie received from the backend
      document.cookie = `auth=${response.data.token}; Secure; HttpOnly; SameSite=Strict;`
    }
    return response?.data?.user ?? null
  }
)


// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
    },
    extraReducers: (builder) => {
       builder
        .addCase(login.fulfilled, (state, action) => {           
            state.isAuthenticated = true
            state.user = action.payload.user
        })
        .addCase(login.rejected (state, action) => {          
            state.error = action.error.message
        })      
        .addCase(signUp.fulfilled (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload.user
        })
        .addCase(signUpUserAsync.rejected (state, action) => {
            state.error = action.error.message
        })
    },
})


// Reducer
export default authSlice.reducer
