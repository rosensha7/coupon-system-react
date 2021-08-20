import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { Component } from "react";
import Coupon from "../../../Models/Coupon";
import { couponDownloadedAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import CouponList from "../CouponList/CouponList";
import SingleCoupon from "../SingleCoupon/SingleCoupon";
import "./CouponsByCategory.css";

interface CouponsByCategoryProps {
    name: string
}

interface CouponsByCategoryState {
    couponList: Coupon[];
}

class CouponsByCategory extends Component<CouponsByCategoryProps, CouponsByCategoryState> {

    public constructor(props: CouponsByCategoryProps) {
        super(props);
        this.state = {
            couponList: store.getState().couponState.coupons
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponsByCategory">
                <div>
                    <Typography variant="h2" style={{textTransform: "uppercase"}} gutterBottom>
                        {this.props.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {this.state.couponList.length} coupon/s found in this category
                    </Typography>
                    <Grid container style={{ padding: 30 }} spacing={5} direction="row" justify="center" alignItems="center">
                        {this.state.couponList.map(item => <Grid item xs={12} sm={12} md={6} lg={3}> <SingleCoupon key={item.id} myCoupon={item} /></Grid>)}

                    </Grid>
                </div>

            </div>
        );
    }

    public async componentDidMount() {
        if (store.getState().couponState.coupons.length === 0) {
            const response = await axios.get("http://localhost:8080/guest/all_coupons");
            console.log(response)
            store.dispatch(couponDownloadedAction(response.data));

        }
        let theCouponList = store.getState().couponState.coupons.filter(item => item.categoryId.toLowerCase() === this.props.name);
        this.setState({
            couponList: theCouponList
        });
    }
}


export default CouponsByCategory;
