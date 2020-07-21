import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { connect } from 'react-redux'
import {
    CssBaseline,
    Typography,
    Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getProducts, takeOrder } from '../services/products'
import actions from '../store/actions/index'
import Navigation from '../components/Navigation'
import CartModal from '../components/CartModal'
import OrderForm from '../components/OrderForm'
import OverviewDrawer from '../components/OverviewDrawer'
import Products from '../containers/Products'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}))

const Homepage = (props) => {
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [orderProducts, setOrderProducts] = useState(false)
    const [order, setOrder] = useState(null)
    const [productInfo, setProductInfo] = useState(null)
    const classes = useStyles()

    const { data: products, status: productStatus } = useQuery({
        queryKey: 'products',
        queryFn: async () => await getProducts(),
        config: {
            onSuccess: (data) => {
                setLoading(false)
            },
            onError: (err) => {
                setLoading(false)
            },
        },
    })

    const cartMapped = props.cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
    }))

    const [takeTheOrder, takingOrder] = useMutation(
        (data) => takeOrder({ ...data, products: cartMapped }),
        {
            onSuccess: () => {
                setModal(false)
                setProductInfo(false)
                props.clearCart()
            },
            onError: () => {
                setLoading(false)
            },
        }
    )

    return (
        <React.Fragment>
            <CssBaseline />
            <CartModal
                modal={modal}
                setModal={setModal}
                setOrderProducts={setOrderProducts}
            />
            <OrderForm
                orderProducts={orderProducts}
                setOrderProducts={setOrderProducts}
                setOrder={setOrder}
                takeTheOrder={takeTheOrder}
                takingOrder={takingOrder}
                loading={loading}
                order={order}
            />
            <OverviewDrawer
                productInfo={productInfo}
                setProductInfo={setProductInfo}
            />
            <header>
                <Navigation {...props} openCart={() => setModal(true)} />
            </header>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            The Yummi Pizza
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Your best decision!
                        </Typography>
                    </Container>
                </div>
                <Products
                    products={products}
                    setProductInfo={setProductInfo}
                    productStatus={productStatus}
                />
            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    The Yummi Pizza
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    Your best decision!
                </Typography>
                <Copyright />
            </footer>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    ...state.cart,
    ...state.auth,
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (products) => dispatch(actions.updateCart(products)),
        clearCart: () => dispatch(actions.clearCart()),
        removeCartItem: (item) => dispatch(actions.removeFromCart(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
