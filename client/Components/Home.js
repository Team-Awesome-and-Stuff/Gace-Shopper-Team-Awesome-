import React from 'react'
import { useSelector } from 'react-redux'
import Products from './Products'

/**
 * COMPONENT
 */
const Home = (props) => {
const user = useSelector((state) => state.auth.login && state.auth.login.id)

    return (
        <div>
            <h3>Welcome, {user}</h3>
            <Products />
        </div>
    )
}

export default Home
