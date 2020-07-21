import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'
import {
    SwipeableDrawer,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from '@material-ui/core'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
}))

const OverviewDrawer = (props) => {
    const { productInfo, setProductInfo } = props
    const classes = useStyles()
    return (
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
                            image={productInfo ? productInfo.imageUrl : '/'}
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
                                        {productInfo && productInfo.quantity}
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
                                        productInfo.quantity * productInfo.price
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

export default connect(mapStateToProps, mapDispatchToProps)(OverviewDrawer)
