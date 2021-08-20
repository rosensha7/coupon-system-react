import { Button, ButtonGroup, Card, CardActionArea, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Company from "../../../Models/Company";
import { companyDeleteAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import jwtAxios from "../../Auth/jwtAxios";
import { ClientType } from "../../Enums/ClientType";
import "./SingleCompany.css";
import BusinessIcon from '@material-ui/icons/Business';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 150,
        borderWidth: 2,
        borderColor: "#005cb2",
        borderRadius: 6
    },
    media: {
        height: 130,
    },
    actionArea: {
        "&:hover": {
            color: "#ffffff",
            background: "linear-gradient(45deg, #64b5f6 20%, #d500f9 96%)"

        }
    },
    button: {
        width: "124px",
        borderRadius: 0,
        "&:hover": {
            color: theme.palette.error.contrastText,
            backgroundColor: "#64b5f6"

        }
    },
    deleteButton: {
        width: "124px",
        borderRadius: 0,
        "&:hover": {
            color: theme.palette.error.contrastText,
            backgroundColor: "#ff34cb"

        }
    }
}));

interface SingleCompanyProps {
    company: Company
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {

    const classes = useStyles();

    const [disableDeleteButton, setDisableDeleteButton] = useState(false);
    const [clientType, setClientType] = useState(store.getState().authState.user?.clientType);

    const ButtonSet = () => {
        let isAdmin = (clientType == ClientType.Administrator);

        return (
            <div className="couponButtons">
                {isAdmin &&
                    <div>
                        <ButtonGroup >
                            <Button className={classes.button} variant="contained" color="primary" component={Link} to={"/admin/editcompany/" + props.company.id}>
                                Edit
                            </Button>
                            <Button className={classes.deleteButton} variant="contained" color="secondary" disabled={disableDeleteButton} onClick={deleteCompany}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </div>
                }
            </div>
        );
    }

    const deleteCompany = async () => {
        await jwtAxios.delete("http://localhost:8080/admin/company/" + props.company.id)
            .then(response => {
                console.log(response);
                notify.success("Company successfully deleted");
                store.dispatch(companyDeleteAction(props.company.id));
                setDisableDeleteButton(true);
            }).catch(error => {
                console.log(error);
                notify.error("Delete process failed");
            })
    }

    return (
        <Card variant="outlined" className={classes.root}>
            <CardActionArea component={Link} to={"/companyinfopage/" + props.company.id} classes={{ root: classes.actionArea }}>
                <CardContent>
                    <BusinessIcon />
                    <Typography variant="h5">
                        {props.company.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
                <ButtonSet />
        </Card>

        // <div className="SingleCompany Box">
        //     <br />
        //     {props.company.id}<br />
        //     {props.company.email}<br />
        //     {props.company.name}<br />
        //     <br />
        //     <ButtonSet />
        // </div>
    );
}

export default SingleCompany;
