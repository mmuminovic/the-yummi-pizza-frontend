import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Home, ShoppingCart, ViewList } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
    },
}))

const Navigation = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar className="justify-content-end">
                    <NavLink
                        exact
                        to="/"
                        className="nav-link"
                        activeStyle={{
                            fontWeight: 'bold',
                            color: '#ff8888',
                        }}
                    >
                        <Typography
                            variant="p"
                            color="inherit"
                            noWrap
                            className="align-items-center"
                            style={{ fontSize: 14 }}
                        >
                            <Home className={classes.icon} />
                            <span>Homepage</span>
                        </Typography>
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className="nav-link"
                        activeStyle={{
                            fontWeight: 'bold',
                            color: '#ff8888',
                        }}
                    >
                        <Typography
                            variant="p"
                            color="inherit"
                            noWrap
                            className="align-items-center"
                            style={{ fontSize: 14 }}
                        >
                            <ShoppingCart className={classes.icon} />
                            <span>Cart</span>
                        </Typography>
                    </NavLink>
                    <NavLink
                        to="/orders"
                        className="nav-link"
                        activeStyle={{
                            fontWeight: 'bold',
                            color: '#ff8888',
                        }}
                    >
                        <Typography
                            variant="p"
                            color="inherit"
                            noWrap
                            className="align-items-center"
                            style={{ fontSize: 14 }}
                        >
                            <ViewList className={classes.icon} />
                            <span>Orders</span>
                        </Typography>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Navigation
