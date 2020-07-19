import axios from 'axios'

export const getProducts = () =>
    new Promise((resolve, reject) => {
        axios
            .get('http://localhost:5000/v1/shop/products')
            .then((products) => {
                resolve(products.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
