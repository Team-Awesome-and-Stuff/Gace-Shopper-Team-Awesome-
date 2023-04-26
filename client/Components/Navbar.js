import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/store'

const Navbar = () => {
    const isLoggedIn = useSelector((state) => !!state.auth.me.id)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutAndRedirectHome = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div>
            <h1>WHOLESALE LIQUIDATORS!</h1>
            <nav className="navbar">
                {isLoggedIn ? (
                    <div className="navbar-line">
                        {/* The navbar will show these links after you log in */}
                        <Link className="home" to="/home">
                            Home
                        </Link>

                        <Link to="/cart">Cart</Link>
                        <button type="button" onClick={logoutAndRedirectHome}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div class="navbar-line">
                        {/* The navbar will show these links before you log in */}
                        <Link className="home" to="/home">
                            Products
                        </Link>
                        <Link href="styles.css" to="/cart">
                            Cart
                        </Link>
                        <Link href="styles.css" to="/login">
                            Login
                        </Link>
                        <Link href="styles.css" to="/signup">
                            Sign Up
                        </Link>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navbar
