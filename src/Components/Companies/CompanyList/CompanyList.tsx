import "./CompanyList.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "../../../Redux/Store";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import SingleCompany from "../SingleCompany/SingleCompany";
import { companyDownloadedAction } from "../../../Redux/CompanyState";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ClientType } from "../../Enums/ClientType";

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

function CompanyList(): JSX.Element {


    const classes = useStyles();

    const [companies, setCompanies] = useState();

    const [clientType, setClientType] = useState(store.getState().authState.user?.clientType);

    let isAdmin = (clientType == ClientType.Administrator);

    useEffect(() => {
        const checkStoreNotEmpty = async () => {
            console.log(store.getState().companyState.companies.length);
            if (store.getState().companyState.companies.length === 0) {
                const response = await axios.get("http://localhost:8080/guest/all_companies");
                const myResponse = response.data;
                console.log(myResponse);
                store.dispatch(companyDownloadedAction(myResponse));
                setCompanies(myResponse);
            }
        }
        checkStoreNotEmpty();
    }, []);

    return (
        <div>
            <Grid container style={{ padding: 20, paddingLeft: 40, paddingRight: 40 }} spacing={5} direction="row" justify="center" alignItems="center">
                {store.getState().companyState.companies.map(item =>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <SingleCompany key={item.id} company={item} />
                    </Grid>)}
            </Grid>
            <Typography>
                <br />
            </Typography>
            {isAdmin &&
                <div>
                    <Button variant="contained" color="primary" component={Link} to="/admin/addcompany" className={classes.button}>
                        Add Company
                    </Button>
                </div>
            }
        </div>
    );
}

export default CompanyList;