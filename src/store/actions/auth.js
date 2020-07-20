import * as actionTypes from './actionTypes'
import axios from 'axios'
import { setAuthToken } from '../utility'
import jwtdecode from 'jwt-decode'

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: authData,
    }
}

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('token')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded,
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        const authData = {
            email: email,
            password: password,
        }
        axios.post('/login', authData).then((res) => {
            const { token } = res.data
            localStorage.setItem('token', token)
            setAuthToken(token)
            try {
                const decoded = jwtdecode(token)
                dispatch(setCurrentUser(decoded))
            } catch (err) {
                dispatch(setCurrentUser({}))
            }
        })
    }
}
