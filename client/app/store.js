import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from '../auth/authSlice'
import productsReducer from '../../client/slices/ProductsSlice'
import singleProductReducer from '../../client/slices/SingleProductSlice'
import cartSlice from '../slices/cartSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        singleProduct: singleProductReducer,
        cart: cartSlice,
        // product: productSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
export * from '../auth/authSlice'

