import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CssBaseline,
    Grid,
    Typography,
    Container,
    SwipeableDrawer,
    ButtonGroup,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Remove as RemoveIcon, Add as AddIcon } from '@material-ui/icons'
import { getProducts } from '../services/products'
import actions from '../store/actions/index'
import Navigation from '../components/Navigation'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {/* <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '} */}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}))

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Homepage = (props) => {
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalStyle] = useState(getModalStyle)
    const [productInfo, setProductInfo] = useState(null)
    const classes = useStyles()

    const { data: products } = useQuery({
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

    console.log(props)

    return (
        <React.Fragment>
            <Navigation {...props} openCart={() => setModal(true)} />
            <CssBaseline />
            <main>
                {/* Hero unit */}
                {/* <Modal
                    open={modal}
                    onClose={() => setModal(!modal)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2 id="simple-modal-title">Text in a modal</h2>
                        <p id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat
                            porttitor ligula.
                        </p>
                    </div>
                </Modal> */}
                <SwipeableDrawer
                    anchor={'bottom'}
                    open={!!productInfo}
                    onClose={() => setProductInfo(null)}
                    onOpen={() => setProductInfo(productInfo)}
                >
                    <div
                        component="children"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '12px',
                        }}
                    >
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card
                                className={classes.card}
                                // style={{ padding: '12px' }}
                            >
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={
                                        productInfo ? productInfo.imageUrl : '/'
                                    }
                                    title="Pizza"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        {productInfo && productInfo.title}
                                    </Typography>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography>
                                            {productInfo && productInfo.price}
                                        </Typography>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <span
                                                component="span"
                                                style={{
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                    marginRight: '12px',
                                                }}
                                                onClick={() => {
                                                    const quantity =
                                                        productInfo.quantity + 1
                                                    setProductInfo({
                                                        ...productInfo,
                                                        quantity,
                                                    })
                                                }}
                                            >
                                                <AddIcon color="primary" />
                                            </span>
                                            <span
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginRight: '12px',
                                                }}
                                            >
                                                {productInfo &&
                                                    productInfo.quantity}
                                            </span>
                                            <span
                                                style={{
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                }}
                                                onClick={() => {
                                                    const quantity =
                                                        productInfo.quantity - 1
                                                    if (quantity >= 1) {
                                                        setProductInfo({
                                                            ...productInfo,
                                                            quantity,
                                                        })
                                                    }
                                                }}
                                            >
                                                <RemoveIcon color="primary" />
                                            </span>
                                        </div>
                                    </div>
                                    <Typography
                                        style={{
                                            textAlign: 'center',
                                            marginTop: '24px',
                                        }}
                                    >
                                        Total:{' '}
                                        {productInfo &&
                                            (
                                                productInfo.quantity *
                                                productInfo.price
                                            ).toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingBottom: '24px',
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={() => {
                                props.updateCart(productInfo)
                                return setProductInfo(null)
                            }}
                            style={{ marginRight: '16px' }}
                        >
                            Add to cart
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="large"
                            onClick={() => setProductInfo(null)}
                        >
                            Close
                        </Button>
                    </div>
                </SwipeableDrawer>

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
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {products &&
                            products.map((product) => (
                                <Grid
                                    item
                                    key={product.id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                >
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={product.imageUrl}
                                            title="Image title"
                                        />
                                        <CardContent
                                            className={classes.cardContent}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography>
                                                {product.description}
                                            </Typography>
                                            <Typography color="primary">
                                                ${product.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    setProductInfo({
                                                        ...product,
                                                        quantity: 1,
                                                    })
                                                }
                                            >
                                                View
                                            </Button>
                                            {props.isAuth && (
                                                <Button
                                                    size="small"
                                                    color="primary"
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
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
            {/* End footer */}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    ...state.cart,
    ...state.auth,
})

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return {
        updateCart: (products) => dispatch(actions.updateCart(products)),
        clearCart: () => dispatch(actions.clearCart()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
