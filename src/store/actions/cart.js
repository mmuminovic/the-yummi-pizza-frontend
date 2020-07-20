import * as actionTypes from './actionTypes'

export const updateCart = (data) => {
    return {
        type: actionTypes.UPDATE_CART,
        payload: data,
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART,
    }
}
