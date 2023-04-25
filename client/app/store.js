import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from '../auth/authSlice'
import productsReducer from '../../client/slices/ProductsSlice'
import singleProductReducer from '../../client/slices/SingleProductSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        singleProduct: singleProductReducer,
        // product: productSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
export * from '../auth/authSlice'
// const store2 = configureStore({
//   home: homeReducer,
