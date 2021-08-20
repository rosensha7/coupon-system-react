import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import store from '../../../Redux/Store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import logoImage from "../../Assets/alcouponlogo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexGrow: 1,
            
        },
        title: {
            flexGrow: 1,
        },
        button: {
            height: 35,
            minWidth: 130,
            margin: theme.spacing(2),
            background: "#2196f3",
            color: "#fafafa",
            "&:hover": {
                backgroundColor: "#64b5f6",
                color: theme.palette.error.contrastText,
            },
        },
        logButton: {
            height: 35,
            minWidth: 130,
            margin: theme.spacing(2),
            background: "#d500f9",
            color: "#fafafa",
            "&:hover": {
                backgroundColor: "#e040fb",
                color: theme.palette.error.contrastText,
            },
        },
        appBar: {
            height: 85,
            // zIndex: theme.zIndex.drawer + 1,
            background: "linear-gradient(216deg, rgba(32,2,140,1) 4%, rgba(129,124,250,1) 95%)"
        },
        logo: {
            width: 164,
            padding: 10,
            borderRadius: 15,
        }
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();

    const [loggedIn, setLoggedIn] = useState(false);
    const [userType, setUserType] = useState(store.getState().authState.user?.clientType);
    useSelector(store.getState);

    let isLogged = () => {
        if (loggedIn)
            return (<Button variant="contained" component={Link} to="/logout" color="secondary" className={classes.logButton} disableElevation>Logout</Button>)
        else
            return <Button variant="contained" component={Link} to="/login" color="secondary" className={classes.logButton} disableElevation>Login</Button>
    };

    useEffect(() => {
        const checkLoggedInStatus = async () => {
            store.subscribe(() => {
                setLoggedIn(store.getState().authState.isLogged);
                setUserType(store.getState().authState.user?.clientType);
            })
        }
        checkLoggedInStatus();
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar>
                    <img src={logoImage} alt="Al Coupon" className={classes.logo}/>
                    <Typography variant="h5" align="left" className={classes.title}></Typography>
                    <nav>
                        <Box display="flex" dir="ltr">
                            <Button variant="contained" component={Link} to="/home" className={classes.button} disableElevation>Home</Button>
                            <Button variant="contained" component={Link} to="/about" className={classes.button} disableElevation>About</Button>
                            <Button variant="contained" component={Link} to="/contact" className={classes.button} disableElevation>Contact Us</Button>
                            {isLogged()}
                        </Box>
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );
}