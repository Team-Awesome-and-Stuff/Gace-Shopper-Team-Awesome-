import React from 'react'
import { useSelector } from 'react-redux'
import Products from './Products'

/**
 * COMPONENT
 */
const Home = (props) => {
    const username = useSelector((state) => state.auth.me.username)

    return (
        <div>
            <Products />
        </div>
    )
}

export default Home
