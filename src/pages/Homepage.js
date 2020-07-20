import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { connect } from 'react-redux'
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
    Modal,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
    Remove as RemoveIcon,
    Add as AddIcon,
    Cancel as CancelIcon,
} from '@material-ui/icons'
import { getProducts, takeOrder } from '../services/products'
import actions from '../store/actions/index'
import Navigation from '../components/Navigation'
import { ModalFooter, Form, Input, Label, FormGroup, Spinner } from 'reactstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

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
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 8, 3),
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        overflow: 'auto',
        maxHeight: '500px',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    cartCard: {
        display: 'flex',
    },
    modalItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        border: '1px solid black',
        padding: '8px 15px',
        borderRadius: '5px',
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
            },
            onError: () => {
                setLoading(false)
            },
        }
    )

    return (
        <React.Fragment>
            <Navigation {...props} openCart={() => setModal(true)} />
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Modal
                    open={!!orderProducts}
                    onClose={() => setOrderProducts(null)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    style={{
                        display: 'flex',
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {takingOrder.status === 'success' ? (
                        <div
                            style={{
                                backgroundColor: 'white',
                                textAlign: 'center',
                                padding: '48px',
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                Taking the order was successful!
                            </Typography>
                            <Typography>Your order:</Typography>
                            <p style={{ margin: '0' }}>
                                Name: {order && order.name}
                            </p>
                            <p style={{ margin: '0' }}>
                                Address: {order && order.address}
                            </p>
                            <p style={{ margin: '0' }}>
                                Phone number: {order && order.phoneNumber}
                            </p>
                            <div
                                style={{
                                    maxHeight: '400px',
                                    overflow: 'auto',
                                    marginBottom: '16px',
                                }}
                            >
                                <p
                                    style={{
                                        marginBottom: '0',
                                        marginTop: '16px',
                                    }}
                                >
                                    Products:
                                </p>
                                {props.cart.map((item, i) => (
                                    <div className={classes.modalItem}>
                                        <div>
                                            <p style={{ margin: '0' }}>
                                                {item.title}
                                            </p>
                                            <p style={{ margin: '0' }}>
                                                {item.quantity} x ${item.price}{' '}
                                                = $
                                                {(
                                                    item.quantity * item.price
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {props.cart.length > 1
                                    ? `Total: ${props.cart
                                          .reduce((acc, val) => {
                                              return (
                                                  acc.price * acc.quantity +
                                                  val.price * val.quantity
                                              )
                                          })
                                          .toFixed(2)} + $10 (shipping) = ${(
                                          props.cart.reduce((acc, val) => {
                                              return (
                                                  acc.price * acc.quantity +
                                                  val.price * val.quantity
                                              )
                                          }) + 10
                                      ).toFixed(2)}`
                                    : props.cart.length === 1
                                    ? `Total: ${(
                                          props.cart[0].price *
                                          props.cart[0].quantity
                                      ).toFixed(2)} + $10 (shipping) = ${(
                                          props.cart[0].price *
                                              props.cart[0].quantity +
                                          10
                                      ).toFixed(2)}`
                                    : null}
                            </div>
                            <Button
                                color="secondary"
                                onClick={() => {
                                    setOrderProducts(null)
                                    props.clearCart()
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    ) : takingOrder.status !== 'loading' ? (
                        <Formik
                            initialValues={{
                                name: '',
                                address: '',
                                phoneNumber: '',
                            }}
                            onSubmit={async (values, actions) => {
                                setOrder({ ...values, products: props.cart })
                                takeTheOrder(values)
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required(),
                                address: Yup.string().required(),
                                phoneNumber: Yup.string().required(),
                            })}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                } = props
                                const { response } = errors
                                return (
                                    <Form
                                        onSubmit={handleSubmit}
                                        style={{
                                            padding: '24px',
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        <FormGroup>
                                            <Label for={'name'}>Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name && (
                                                <div
                                                    style={{
                                                        color: 'orangered',
                                                    }}
                                                >
                                                    {errors.name}
                                                </div>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for={'address'}>
                                                Address
                                            </Label>
                                            <Input
                                                name="address"
                                                type="text"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.address && touched.address && (
                                                <div
                                                    style={{
                                                        color: 'orangered',
                                                    }}
                                                >
                                                    {errors.address}
                                                </div>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for={'phoneNumber'}>
                                                Phone number
                                            </Label>
                                            <Input
                                                name="phoneNumber"
                                                type="text"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.phoneNumber &&
                                                touched.phoneNumber && (
                                                    <div
                                                        style={{
                                                            color: 'orangered',
                                                        }}
                                                    >
                                                        {errors.phoneNumber}
                                                    </div>
                                                )}
                                        </FormGroup>
                                        {response && (
                                            <div style={{ color: 'orangered' }}>
                                                {response}
                                            </div>
                                        )}
                                        <ModalFooter>
                                            <Button
                                                color="primary"
                                                onClick={handleSubmit}
                                                disabled={loading}
                                            >
                                                Order!
                                            </Button>{' '}
                                            <Button
                                                color="secondary"
                                                onClick={() =>
                                                    setOrderProducts(false)
                                                }
                                                disabled={loading}
                                            >
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Form>
                                )
                            }}
                        </Formik>
                    ) : takingOrder.status === 'loading' ? (
                        <div
                            style={{
                                backgroundColor: 'white',
                                height: '200px',
                                width: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Spinner color="danger" />
                        </div>
                    ) : null}
                </Modal>
                <Modal
                    open={modal}
                    onClose={() => setModal(!modal)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    style={{
                        display: 'flex',
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid container className={classes.paper}>
                        {props.cart.length > 0 ? (
                            props.cart.map((item, i) => (
                                <div className={classes.modalItem}>
                                    <div>
                                        <img
                                            src={item.imageUrl}
                                            alt="image"
                                            style={{
                                                height: '100px',
                                                float: 'right',
                                                marginRight: '24px',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                                style={{
                                                    display: 'inline-block',
                                                    margin: '0',
                                                    marginRight: '16px',
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                            <span
                                                onClick={() =>
                                                    props.removeCartItem(item)
                                                }
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <CancelIcon htmlColor="#f50057" />
                                            </span>
                                        </div>
                                        <p>
                                            {item.quantity} x ${item.price} = $
                                            {(
                                                item.quantity * item.price
                                            ).toFixed(2)}
                                        </p>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '100px',
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
                                                        item.quantity + 1
                                                    props.updateCart({
                                                        ...item,
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
                                                {item.quantity}
                                            </span>
                                            <span
                                                style={{
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                }}
                                                onClick={() => {
                                                    const quantity =
                                                        item.quantity - 1
                                                    if (quantity >= 1) {
                                                        props.updateCart({
                                                            ...item,
                                                            quantity,
                                                        })
                                                    }
                                                }}
                                            >
                                                <RemoveIcon color="primary" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={classes.modalItem}>
                                No items in cart
                            </div>
                        )}
                        {props.cart.length > 0 ? (
                            <div
                                style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div>Shipping: $10</div>
                                <div
                                    className={classes.modalItem}
                                    style={{
                                        width: '350px',
                                    }}
                                >
                                    {props.cart.length > 1
                                        ? `Total: ${props.cart
                                              .reduce((acc, val) => {
                                                  return (
                                                      acc.price * acc.quantity +
                                                      val.price * val.quantity
                                                  )
                                              })
                                              .toFixed(
                                                  2
                                              )} + $10 (shipping) = ${(
                                              props.cart.reduce((acc, val) => {
                                                  return (
                                                      acc.price * acc.quantity +
                                                      val.price * val.quantity
                                                  )
                                              }) + 10
                                          ).toFixed(2)}`
                                        : `Total: ${(
                                              props.cart[0].price *
                                              props.cart[0].quantity
                                          ).toFixed(2)} + $10 (shipping) = ${(
                                              props.cart[0].price *
                                                  props.cart[0].quantity +
                                              10
                                          ).toFixed(2)}`}
                                </div>
                            </div>
                        ) : null}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '12px',
                                paddingBottom: '12px',
                            }}
                        >
                            {props.cart.length > 0 ? (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    onClick={() => setOrderProducts(true)}
                                    style={{ marginRight: '16px' }}
                                >
                                    Take an order
                                </Button>
                            ) : null}
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="large"
                                onClick={() => setModal(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </Grid>
                </Modal>
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
                    <Grid container spacing={4}>
                        {productStatus === 'success' ? (
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
                            ))
                        ) : productStatus === 'loading' ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flexGrow: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Spinner color="danger" />
                            </div>
                        ) : productStatus === 'error' ? (
                            <p>Error occurs</p>
                        ) : null}
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
    return {
        updateCart: (products) => dispatch(actions.updateCart(products)),
        clearCart: () => dispatch(actions.clearCart()),
        removeCartItem: (item) => dispatch(actions.removeFromCart(item)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
