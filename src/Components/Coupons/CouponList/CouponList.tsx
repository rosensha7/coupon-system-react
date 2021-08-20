import { Component, SyntheticEvent } from "react";
import "./CouponList.css";
import axios from "axios";
import store from "../../../Redux/Store";
import Coupon from "../../../Models/Coupon";
import { couponDownloadedAction } from "../../../Redux/CouponState";
import SingleCoupon from "../SingleCoupon/SingleCoupon";
import { Grid } from "@material-ui/core";

interface CouponListState {
    allCoupons: Coupon[];
}

class CouponList extends Component<{}, CouponListState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            allCoupons: store.getState().couponState.coupons
        }
    }

    public render(): JSX.Element {
        return (
            <div className="CouponList">
                <Grid container style={{paddingLeft:30, paddingRight: 30}} spacing={3} direction="row" justify="center" alignItems="center">
                        {this.state.allCoupons.map(item => <Grid item xs={12} sm={12} md={6} lg={3}> <SingleCoupon key={item.id} myCoupon={item} /></Grid>)}
                    </Grid>
                
            </div >
        );
    }

    public async componentDidMount() {
        if (store.getState().couponState.coupons.length === 0) {
            console.log("before axios");
            const response = await axios.get("http://localhost:8080/guest/all_coupons");
            store.dispatch(couponDownloadedAction(response.data));
            this.setState({
                allCoupons: response.data
            });
        }
        store.subscribe(() => {
            this.setState({
                allCoupons: store.getState().couponState.coupons
            })
        })
    }
}

export default CouponList;