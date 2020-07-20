import axios from 'axios'

export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues,
    }
}

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
