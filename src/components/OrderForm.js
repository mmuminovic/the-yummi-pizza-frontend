import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Modal, Typography, Button } from '@material-ui/core'
import { ModalFooter, Form, FormGroup, Input, Label, Spinner } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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

const OrderForm = (props) => {
    const {
        orderProducts,
        setOrderProducts,
        setOrder,
        takeTheOrder,
        takingOrder,
        loading,
        order,
    } = props
    const classes = useStyles()
    return (
        <Modal
            open={!!orderProducts}
            onClose={() => {
                setOrderProducts(null)
                takingOrder.reset()
            }}
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
                    <Typography gutterBottom variant="h5" component="h2">
                        Taking the order was successful!
                    </Typography>
                    <Typography>Your order:</Typography>
                    <p style={{ margin: '0' }}>Name: {order && order.name}</p>
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
                                    <p style={{ margin: '0' }}>{item.title}</p>
                                    <p style={{ margin: '0' }}>
                                        {item.quantity} x ${item.price} = $
                                        {(item.quantity * item.price).toFixed(
                                            2
                                        )}
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
                                  props.cart[0].price * props.cart[0].quantity
                              ).toFixed(2)} + $10 (shipping) = ${(
                                  props.cart[0].price * props.cart[0].quantity +
                                  10
                              ).toFixed(2)}`
                            : null}
                    </div>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setOrderProducts(null)
                            props.clearCart()
                            takingOrder.reset()
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
                                    <Label for={'address'}>Address</Label>
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
                                    {errors.phoneNumber && touched.phoneNumber && (
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
                                        onClick={() => setOrderProducts(false)}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
