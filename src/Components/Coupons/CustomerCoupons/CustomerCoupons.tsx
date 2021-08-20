import "./CustomerCoupons.css";
import React, { useEffect, useState } from "react";
import jwtAxios from "../../Auth/jwtAxios";
import store from "../../../Redux/Store";
import SingleCoupon from "../SingleCoupon/SingleCoupon";
import Coupon from "../../../Models/Coupon";
import Customer from "../../../Models/Customer";
import { Grid } from "@material-ui/core";


function CustomerCoupons(): JSX.Element {

    const [customer, setCustomer] = useState(new Customer);

    useEffect(() => {
        const getFromServer = async () => {
            await jwtAxios.get("http://localhost:8080/customer/details")
                .then(response => {
                    console.log(response);
                    setCustomer(response.data);
                }).catch(error => {
                    console.log(error);
                })
        };
        getFromServer();
    }, []);

    return (
        <div className="CustomerCoupons">
            <Grid container style={{ paddingLeft: 30, paddingRight: 30 }} spacing={3} direction="row" justify="center" alignItems="center">
                {customer && customer.couponList.map((item: Coupon) =>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <SingleCoupon key={item.id} myCoupon={item} />
                    </Grid>)}
                {!customer && <span>You are unauthorized to view this page. Please login first.</span>}
            </Grid>
        </div>
    );
}

export default CustomerCoupons;