import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Badge } from '@material-ui/core'
import { ShoppingCart, ViewList } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
    },
}))

const Navigation = (props) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar
                    className="justify-content-end"
                    style={{ backgroundColor: '#ff8700' }}
                >
                    {/* <NavLink
                        exact
                        to="/"
                        className="nav-link"
                        activeStyle={{
                            fontWeight: 'bold',
                            color: '#ff8888',
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="inherit"
                            noWrap
                            className="align-items-center"
                            style={{ fontSize: 14 }}
                        >
                            <Home className={classes.icon} />
                            <span>Homepage</span>
                        </Typography>
                    </NavLink> */}
                    <span
                        onClick={props.openCart}
                        className="nav-link"
                        style={{ cursor: 'pointer' }}
                    >
                        <Typography
                            variant="caption"
                            color="inherit"
                            noWrap
                            className="align-items-center"
                            style={{ fontSize: 14 }}
                        >
                            <Badge
                                badgeContent={props.cart.length}
                                color="secondary"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <ShoppingCart className={classes.icon} />
                            </Badge>
                            <span>Cart</span>
                        </Typography>
                    </span>
                    {props.isAuth && (
                        <NavLink
                            to="/orders"
                            className="nav-link"
                            activeStyle={{
                                fontWeight: 'bold',
                                color: '#ff8888',
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="inherit"
                                noWrap
                                className="align-items-center"
                                style={{ fontSize: 14 }}
                            >
                                <ViewList className={classes.icon} />
                                <span>Orders</span>
                            </Typography>
                        </NavLink>
                    )}
                    {/* <NavLink
                        to="/login"
                        className="nav-link"
                        activeStyle={{
                            fontWeight: 'bold',
                            color: '#ff8888',
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="inherit"
                            noWrap
                            className="align-items-center"
                            style={{ fontSize: 14 }}
                        >
                            <Laptop className={classes.icon} />
                            <span>Login</span>
                        </Typography>
                    </NavLink> */}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navigation
