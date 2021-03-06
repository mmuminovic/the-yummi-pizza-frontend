import * as actionTypes from './actionTypes'

export const updateCart = (data) => {
    return {
        type: actionTypes.UPDATE_CART,
        payload: data,
    }
}

export const removeFromCart = (data) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: data,
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART,
    }
}
