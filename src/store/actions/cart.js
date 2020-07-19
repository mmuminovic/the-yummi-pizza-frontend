import * as actionTypes from './actionTypes'

export const updateCart = (data) => {
    return {
        type: actionTypes.UPDATE_CART,
        payload: data,
    }
}
