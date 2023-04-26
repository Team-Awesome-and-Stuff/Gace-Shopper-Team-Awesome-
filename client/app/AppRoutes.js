import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AuthForm from '../auth/AuthForm'
import Home from '../Components/Home'
import { Login } from './store'
import SingleProduct from '../Components/SingleProduct'
import Checkout from '../Components/Checkout'
import Cart from '../Components/Cart'

/**
 * COMPONENT
 */

const AppRoutes = () => {
    const isLoggedIn = useSelector((state) => !!state.auth.Login.id)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Login())
    }, [])

    return (
        <div>
            {isLoggedIn ? (
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route to="/profile" element={<UserProfile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route
                        path="/*"
                        element={<AuthForm name="login" displayName="Login" />}
                    />
                    <Route
                        path="/login"
                        element={<AuthForm name="login" displayName="Login" />}
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthForm name="signup" displayName="Sign Up" />
                        }
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/products/:id" element={<SingleProduct />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            )}
        </div>
    )
}

export default AppRoutes
