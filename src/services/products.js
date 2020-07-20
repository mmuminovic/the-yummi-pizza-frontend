import axios from 'axios'

export const getProducts = () =>
    new Promise((resolve, reject) => {
        axios
            .get('/v1/shop/products')
            .then((products) => {
                resolve(products.data)
            })
            .catch((err) => {
                reject(err)
            })
    })

export const takeOrder = (data) =>
    new Promise((resolve, reject) => {
        axios
            .post('/v1/shop/orders', data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
