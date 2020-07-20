import * as actionTypes from '../actions/actionTypes'

const initialState = {
    cart: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CART:
            const cartIds = state.cart.map((item) => item.id)
            if (cartIds.indexOf(action.payload.id) < 0) {
                state.cart.push(action.payload)
            } else {
                state = {
                    cart: state.cart.filter(
                        (item) => item.id !== action.payload.id
                    ),
                }
                state.cart.push(action.payload)
            }
            return state
        case actionTypes.CLEAR_CART:
            state = {
                cart: [],
            }
            return state
        default:
            return state
    }
}

export default reducer
