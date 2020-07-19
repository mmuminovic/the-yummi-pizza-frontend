import { updateObject } from '../utility'
import * as actionTypes from '../actions/actionTypes'
import isEmpty from '../is-empty'

const initialState = {
    cart: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CART:
            return updateObject(state, action.data)
        default:
            return state
    }
}

export default reducer
