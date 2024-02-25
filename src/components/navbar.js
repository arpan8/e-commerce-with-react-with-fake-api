/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { getCartsByUser } from '../pages/carts/api';
import { storeCartItems } from '../store/cart';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

export default function Navbar() {
    const { amount } = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    const getCartsDetails = async () => {
        const res = await getCartsByUser()
        const { getProductsWithcarts, totalCart } = res
        // console.log(res)
        dispatch(storeCartItems({ getProductsWithcarts, totalCart }))
    }

    React.useEffect(() => {
        getCartsDetails()
    }, [])


    return (
        // <Router>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Practice redux toolkit with cart items
                    </Typography>

                    <IconButton
                        aria-label="home"
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        <Link to="/">
                            <Tooltip title="Home">
                                <HomeIcon />
                            </Tooltip>
                        </Link>
                    </IconButton>


                    <IconButton
                        aria-label="cart"
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        <Badge badgeContent={amount} color="success" max={10}>
                            <Link to="/carts">
                                <Tooltip title="Cart">
                                    <ShoppingCartIcon />
                                </Tooltip>
                            </Link>
                        </Badge>
                    </IconButton>

                </Toolbar>
            </AppBar>
            {/* <AllRoutes /> */}
        </Box>
        // </Router>
    );
}
