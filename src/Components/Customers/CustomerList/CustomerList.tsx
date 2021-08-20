import "./CustomerList.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "../../../Redux/Store";
import { customerDownloadedAction } from "../../../Redux/CustomerState";
import SingleCustomer from "../SingleCustomer/SingleCustomer";
import jwtAxios from "../../Auth/jwtAxios";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    button: {
        width: "200px",
        margin: theme.spacing(1),
        color: theme.palette.error.contrastText,
        "&:hover": {
          color: theme.palette.error.contrastText,
          backgroundColor: "#64b5f6"
          
      }
    }
}));


function CustomerList(): JSX.Element {

    const classes = useStyles();
    
    const [customers, setCustomers] = useState();

    useEffect(() => {
        const checkStoreNotEmpty = async () => {
            console.log(store.getState().customerState.customers.length);
            if (store.getState().customerState.customers.length === 0) {
                const response = await jwtAxios.get("http://localhost:8080/admin/customers");
                store.dispatch(customerDownloadedAction(response.data));
                setCustomers(response.data);
            }
        }
        checkStoreNotEmpty();
    }, []);

    return (
        <div className="CustomerList">
            <Grid container style={{ paddingLeft: 30, paddingRight: 30 }} spacing={3} direction="row" justify="center" alignItems="center">
                {store.getState().customerState.customers.map(item => <Grid item xs={12} sm={12} md={6} lg={3}> <SingleCustomer key={item.id} customer={item} /></Grid>)}
            </Grid>
            <Typography>
                <br/>
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/admin/addcustomer" className={classes.button}>
                Add Customer
            </Button>
        </div>
    );
}

export default CustomerList;
