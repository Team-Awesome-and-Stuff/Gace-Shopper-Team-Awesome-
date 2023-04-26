import React from 'react'
import { useSelector } from 'react-redux'
import Products from './Products'
import AuthForm from '../auth/AuthForm'

/**
 * COMPONENT
 */
const Home = (props) => {
    const username = useSelector((state) => state.auth.me.username)

    return (
        <div>
            {/* <AuthForm /> */}
            <Products />
        </div>
    )
}

export default Home
