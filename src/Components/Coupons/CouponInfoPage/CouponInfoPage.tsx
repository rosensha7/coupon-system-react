import { Component, SyntheticEvent } from "react";
import axios from "axios";
import Coupon from "../../../Models/Coupon";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";


interface CouponInfoPageProps {
    id: string
}

interface CouponInfoPageState {
    myCoupon: Coupon
    photo: any[]
    unsplashId: string
}

class CouponInfoPage extends Component<CouponInfoPageProps, CouponInfoPageState> {

    public constructor(props: CouponInfoPageProps) {
        super(props);
        this.state = {
            myCoupon: new Coupon,
            photo: [],
            unsplashId: "fjI-lDBoHQoRtlBkEpI0yDPfBQiAo6zCNp6Hkq9RR5g"
        };
    }

    public async componentDidMount() {
        const response = await axios.get("http://localhost:8080/guest/coupons/" + this.props.id);
        console.log(response);
        this.setState({
            myCoupon: response.data
        });

        const getImageUnsplash = async () => {
            await axios.get("https://api.unsplash.com/search/photos?page=1&query=" + this.state.myCoupon.title + "&client_id=" + this.state.unsplashId + "&per_page=1")
                .then(response => {
                    console.log(response);
                    this.setState({
                        ...this.state,
                        photo: response.data.results
                    })
                }).catch(error => {
                    console.log(error);
                });
        }
        getImageUnsplash();
    }

    getImage() {
        return (
            <div>
                {this.state.photo.slice(0, 1).map(p => (<img src={p.urls.small} width="100%" height="300" style={{ borderRadius: 6, objectFit: "none" }} />))}
            </div>
        );
    }

    public render(): JSX.Element {
        return (
            <Grid container style={{ padding: 15 }} spacing={2} direction="row" justify="center" alignItems="center">
                <Grid item xs={6}>
                    <Card variant="outlined" style={{
                        padding: 20,
                        borderWidth: 2,
                        borderColor: "#005cb2",
                        borderRadius: 6
                    }}>
                        {this.getImage()}
                        <CardContent>
                            <Typography gutterBottom variant="body2" color="textSecondary" component="p" align="left">
                                Category: {this.state.myCoupon.categoryId}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                                {this.state.myCoupon.title}
                            </Typography>
                            <Typography gutterBottom variant="h6" color="textSecondary" component="p">
                                {this.state.myCoupon.description}
                            </Typography>
                            <Typography gutterBottom variant="body2" component="p">
                                {new Date(Date.parse(this.state.myCoupon.startDate.toString())).toDateString()} - to - {new Date(Date.parse(this.state.myCoupon.endDate.toString())).toDateString()}
                            </Typography>
                            <Typography variant="h6" component="p" align="left">
                                {this.state.myCoupon.price} $
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" align="left">
                                In Stock: {this.state.myCoupon.amount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            //     <div className="CouponInfoPage Box">
            //       <span>Title: </span>{this.state.myCoupon.title}<br/>
            //       <span>Description: </span><br/>{this.state.myCoupon.description}<br/>
            //       <span>Category: </span>{this.state.myCoupon.categoryId}<br/>
            //       <span>Price: </span>{this.state.myCoupon.price}<br/>
            //       <span>In stock: </span>{this.state.myCoupon.amount}<br/>
            //       <span>Starts on: </span>{new Date(Date.parse(this.state.myCoupon.startDate.toString())).toDateString()}<br/>
            //       <span>Expires: </span>{new Date(Date.parse(this.state.myCoupon.endDate.toString())).toDateString()}<br/>
            //       {this.getImage()}
            //   </div>
        );
    }
}

export default CouponInfoPage;