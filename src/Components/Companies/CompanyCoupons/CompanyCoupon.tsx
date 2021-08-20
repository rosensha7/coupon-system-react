import "./CompanyCoupons.css";
import React, { useEffect, useState } from "react";
import jwtAxios from "../../Auth/jwtAxios";
import store from "../../../Redux/Store";
import Coupon from "../../../Models/Coupon";
import Customer from "../../../Models/Customer";
import { Grid } from "@material-ui/core";
import Company from "../../../Models/Company";
import SingleCoupon from "../../Coupons/SingleCoupon/SingleCoupon";


function CompanyCoupons(): JSX.Element {

    const [company, setCompany] = useState(new Company);

    useEffect(() => {
        const getFromServer = async () => {
            await jwtAxios.get("http://localhost:8080/company/details")
                .then(response => {
                    setCompany(response.data);
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                })
        };
        getFromServer();
    }, []);

    return (
        <div className="CompanyCoupons">
            <Grid container style={{ paddingLeft: 30, paddingRight: 30 }} spacing={3} direction="row" justify="center" alignItems="center">
                {company && company.couponList.map((item: Coupon) =>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <SingleCoupon key={item.id} myCoupon={item} />
                    </Grid>)}
                {!company && <span>You are unauthorized to view this page. Please login first.</span>}
            </Grid>
        </div>
    );
}

export default CompanyCoupons;