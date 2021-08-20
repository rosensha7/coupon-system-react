import { Link, NavLink } from "react-router-dom";
import "./Aside.css"
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import { useSelector } from "react-redux";
import { ClientType } from "../../Enums/ClientType";
import logoImage from "../../Assets/alcouponlogo.png";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            display: "flex",
            flexGrow: 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        bottomPush: {
            position: "fixed",
            bottom: 0,
            // textAlign: "center",
            paddingBottom: 10,
        },
        topPush: {
            position: "static",
            top: 150,
        },
        logo: {
            height: 140,
            width: 210,
            position: "static",
            top: 0,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15,
        },
        smicons: {
            marginLeft: 50,
            fontSize: 35
        }
    }),
);

function Aside(): JSX.Element {

    const classes = useStyles();
    const [loggedIn, setLoggedIn] = useState(store.getState().authState.user != null);
    const [userType, setUserType] = useState(store.getState().authState.user?.clientType);
    useSelector(store.getState);

    let isLogged = () => {
        if (loggedIn)
            return (<NavLink exact to="/logout">Logout</NavLink>)
        else
            return <NavLink exact to="/login">Login</NavLink>
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
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                
                    <List className={classes.topPush}>
                    <ListItem alignItems="center">
                    <img src={logoImage} alt="Al Coupon" className={classes.logo} />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/allcoupons">
                            <ListItemText style={{textAlign: "center"}} primary="All Coupons" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/categories">
                            <ListItemText style={{textAlign: "center"}} primary="Categories" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/allcompanies">
                            <ListItemText style={{textAlign: "center"}} primary="Companies" />
                        </ListItem>
                        <Divider />
                        <ListItem alignItems="center" className={classes.bottomPush}>
                            <a href="https://www.linkedin.com/in/shay-rosen-71868b151/">
                                <LinkedInIcon className={classes.smicons}/>
                            </a>
                            <a href="https://github.com/rosensha7">
                                <GitHubIcon className={classes.smicons} />
                            </a>
                        
                            {/* <Typography><br/>Copyright&copy; Shay</Typography> */}
                        </ListItem>
                        {(userType == ClientType.Administrator) &&
                            <div>
                                <ListItem button component={Link} to="/admin/allcustomers">
                                    <ListItemText style={{textAlign: "center"}} primary="Customers" />
                                </ListItem>
                                <Divider />
                            </div>}
                        {(userType == ClientType.Customer) &&
                            <div>
                                <ListItem button component={Link} to="/customer/details">
                                    <ListItemText style={{textAlign: "center"}} primary="My Coupons" />
                                </ListItem>
                                <Divider />
                            </div>}
                        {(userType == ClientType.Company) &&
                            <div>
                                <ListItem button component={Link} to="/company/createcoupon">
                                    <ListItemText style={{textAlign: "center"}} primary="Add Coupon" />
                                </ListItem>
                                <ListItem button component={Link} to="/company/details">
                                    <ListItemText style={{textAlign: "center"}} primary="My Coupons" />
                                </ListItem>

                                <Divider />
                            </div>}

                    </List>

                </div>
            </Drawer>

        </div>
    );
}

export default Aside;


// import { NavLink } from "react-router-dom";
// import store from "../../../Redux/Store";
// import { useSelector } from  "react-redux";
// import "./Aside.css"
// import { useState } from "react";
// import { useEffect } from "react";
// import { ClientType } from "../../Enums/ClientType";

// function Aside():JSX.Element{

//     const [ loggedIn, setLoggedIn ] = useState(store.getState().authState.user != null);
//     const [ userType, setUserType ] = useState(store.getState().authState.user?.clientType);
//     useSelector(store.getState);

//     let isLogged = ()=>{
//         if(loggedIn)
//             return(<NavLink exact to="/logout">Logout</NavLink>)
//         else
//             return <NavLink exact to="/login">Login</NavLink>
//     };

//     useEffect( () => {
//         const checkLoggedInStatus = async () => {
//             store.subscribe(()=>{
//                 setLoggedIn(store.getState().authState.isLogged);
//                 setUserType(store.getState().authState.user?.clientType);
//             })
//         }
//         checkLoggedInStatus();
//     }, []);

//     return(
//         <div className="Menu">
//             {store.getState().authState.isLogged?<span>Hello {store.getState().authState.user.userEmail}</span>:<span>Hello guest</span>}
//             <nav>
//                 {isLogged()}
//                 <NavLink exact to="/home" >Home</NavLink>
//                 {(userType==ClientType.Customer) && <div className="subNav"><NavLink exact to="/customer/details">My Coupons</NavLink></div>}
//                 <NavLink exact to="/allcoupons" >All Coupons</NavLink>
//                 <NavLink exact to="/categories" >Categories</NavLink>
//                 <NavLink exact to="/allcompanies" >All Companies</NavLink>
//                 <NavLink exact to="/about" >About</NavLink>
//                 <NavLink exact to="/contact" >Contact Us</NavLink>
//                 {(userType==ClientType.Administrator) && 
//                 <div className="subNav">
//                 <NavLink exact to="/admin/allcustomers" >All Customers</NavLink>
//                 <NavLink exact to="/admin/addcustomer" >Add Customer</NavLink>
//                 <NavLink exact to="/admin/addcompany" >Add Company</NavLink>
//                 </div>}
//                 {(userType==ClientType.Company) &&
//                 <div className="subNav">
//                 <NavLink exact to="/company/createcoupon" >Add Coupon</NavLink></div>}
//             </nav>
//         </div>
//     );
// }

// export default Aside;


