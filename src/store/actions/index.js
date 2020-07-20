import { logoutUser, login, setCurrentUser } from './auth'

import { updateCart, clearCart } from './cart'

const actions = {
    logoutUser,
    login,
    setCurrentUser,
    updateCart,
    clearCart,
}

export default actions
