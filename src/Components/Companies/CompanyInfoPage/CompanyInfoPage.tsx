import "./CompanyInfoPage.css";
import { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import { useHistory } from "react-router";
import axios from "axios";
import SingleCoupon from "../../Coupons/SingleCoupon/SingleCoupon";
import { Typography, Grid } from "@material-ui/core";

interface CompanyInfoPageProps {
    id: string
}

function CompanyInfoPage(props: CompanyInfoPageProps): JSX.Element {

    const [company, setCompany] = useState(new Company);
    const history = useHistory();

    useEffect(() => {
        const getFromServer = async () => {
            const response = await axios.get("http://localhost:8080/guest/company/" + props.id)
                .then(response => {
                    setCompany(response.data);
                }).catch(err => {
                    history.push("/404");
                })
        };
        getFromServer();
    }, [])

    return (

        
        <div>
                    <Typography variant="h2" style={{textTransform: "uppercase"}} gutterBottom>
                        {company.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Company's e-mail: {company.email}
                    </Typography>
                    {/* <Typography variant="h6" gutterBottom>
                        {company.couponList.length} coupon/s found by that Company
                    </Typography> */}
                    <Grid container style={{ padding: 30 }} spacing={5} direction="row" justify="center" alignItems="center">
                        {company.couponList?.map(item => <Grid item xs={12} sm={12} md={6} lg={3}> <SingleCoupon key={item.id} myCoupon={item}/></Grid>)}

                    </Grid>
                </div>
    );
}

export default CompanyInfoPage;