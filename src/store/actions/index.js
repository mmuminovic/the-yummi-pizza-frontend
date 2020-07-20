import { logoutUser, login, setCurrentUser } from './auth'

import { updateCart, clearCart, removeFromCart } from './cart'

const actions = {
    logoutUser,
    login,
    setCurrentUser,
    updateCart,
    clearCart,
    removeFromCart,
}

export default actions
