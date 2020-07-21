import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'
import { Modal, Typography, Button, Grid } from '@material-ui/core'
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Cancel as CancelIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
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

const CartModal = (props) => {
    const { modal, setModal, setOrderProducts } = props
    const classes = useStyles()
    return (
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
                                    alt=""
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
                                    {(item.quantity * item.price).toFixed(2)}
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
                                            const quantity = item.quantity + 1
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
                                            const quantity = item.quantity - 1
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
                    <div className={classes.modalItem}>No items in cart</div>
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
                                      .toFixed(2)} + $10 (shipping) = ${(
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

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)
