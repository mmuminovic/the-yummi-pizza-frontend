import React from 'react'
import {
    Typography,
    Button,
    Grid,
    Container,
    Card,
    CardMedia,
    CardContent,
    CardActions,
} from '@material-ui/core'
import { Spinner } from 'reactstrap'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
}))

const Products = (props) => {
    const { productStatus, products, setProductInfo } = props
    const classes = useStyles()
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {productStatus === 'success' ? (
                    products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={product.imageUrl}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
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
                                        <Button size="small" color="primary">
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
    )
}

export default Products
