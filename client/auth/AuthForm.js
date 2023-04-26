import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, signup } from '../app/authSlice'

const AuthForm = () => {
    const { error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const email = evt.target.email.value
        const password = evt.target.password.value
        if (displayName === 'Login') {
            dispatch(login({ email, password }))
        } else {
            dispatch(signup({ email, password }))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        <small>Email</small>
                    </label>
                    <input name="email" type="email" />
                </div>
                <div>
                    <label htmlFor="password">
                        <small>Password</small>
                    </label>
                    <input name="password" type="password" />
                </div>
                <div>
                    <button type="submit">{displayName}</button>
                </div>
                {error && <div>{error.message}</div>}
            </form>
        </div>
    )
}

export default AuthForm
