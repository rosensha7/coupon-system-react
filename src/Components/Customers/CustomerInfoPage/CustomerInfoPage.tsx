import "./CustomerInfoPage.css";
import React, { useEffect, useState } from "react";
import jwtAxios from "../../Auth/jwtAxios";
import store from "../../../Redux/Store";
import { useHistory } from "react-router";
import { ClientType } from "../../Enums/ClientType";
import { Redirect } from "react-router-dom";
import { Typography, Grid, Card } from "@material-ui/core";
import SingleCoupon from "../../Coupons/SingleCoupon/SingleCoupon";

interface CustomerInfoPageProps {
    id: string
}

function CustomerInfoPage(props: CustomerInfoPageProps): JSX.Element {

    const [isAdmin, setIsAdmin] = useState(store.getState().authState.user?.clientType == ClientType.Administrator);
    const [customer, setCustomer] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const getFromServer = async () => {
            const response = await jwtAxios.get("http://localhost:8080/admin/customer/" + props.id)
                .then(response => {
                    console.log(response);
                    setCustomer(response.data);
                }).catch(err => {
                    console.log(err);
                    history.push("/404");
                })
        };
        if (isAdmin)
            getFromServer();
    }, []);

    const checkIsAdmin = () => {
        if (!isAdmin) { return (<div><Redirect to="/404" exact /></div>) }
    }

    return (
        <div>
            {checkIsAdmin()}
            <Typography variant="h4" gutterBottom>
                Customer Details
            </Typography>
            <Grid container style={{ padding: 30 }} spacing={5} direction="row" justify="center" alignItems="center">
                <Grid item xs={3}>
                    <Card variant="outlined" style={{
                        padding: 20,
                        borderWidth: 2,
                        borderColor: "#005cb2",
                        borderRadius: 6,
                    }}>
                        <Typography variant="h6">First Name: {customer.firstname}</Typography>
                        <Typography variant="h6">Last Name: {customer.lastname}<br/><br/></Typography>
                        <Typography variant="body1">Customer ID: {customer.id}</Typography>
                        <Typography variant="body1">E-mail: {customer.email}</Typography>
                    </Card>
                </Grid>
            </Grid>
        </div>

        // <div className="CustomerInfoPage Box">
        //     {checkIsAdmin()}
        //     {customer && <span>Customer ID: {customer.id}</span>}<br/>
        //     {customer && <span>First Name: {customer.firstname}</span>}<br/>
        //     {customer && <span>Last Name: {customer.lastname}</span>}<br/>
        //     {customer && <span>Email: {customer.email}</span>}<br/>
        //     {!customer && <span>You are unauthorized to view this page. Please login first.</span>}
        // </div>
    );
}

export default CustomerInfoPage;