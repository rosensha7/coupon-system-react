import { Button, ButtonGroup, Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { StoreRounded } from "@material-ui/icons";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Customer from "../../../Models/Customer";
import { customerDeleteAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import jwtAxios from "../../Auth/jwtAxios";
import "./SingleCustomer.css";
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    card: {
        // maxWidth: 345,
        // background: '#e3f2fd',

        height: 340,
        borderWidth: 2,
        borderColor: "#005cb2",
        borderRadius: 6

    },
    button: {
        width: "130px",
        margin: 2,
        color: theme.palette.error.contrastText,
        "&:hover": {
            color: theme.palette.error.contrastText,
            backgroundColor: "#64b5f6"

        }

    }
}));

interface SingleCustomerProps {
    customer: Customer
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {

    const classes = useStyles();

    const [disableDeleteButton, setDisableDeleteButton] = useState(false);

    const deleteCustomer = async () => {
        await jwtAxios.delete("http://localhost:8080/admin/customer/" + props.customer.id)
            .then(response => {
                store.dispatch(customerDeleteAction(props.customer.id));
                notify.success("Customer deleted successfully");
                setDisableDeleteButton(true);
            }).catch(error => {
                notify.error("Delete process failed.")
            })
    }

    return (

        <Card variant="outlined" className={classes.card} style={{ padding: 20 }}>
            <CardContent>
                <PersonIcon style={{fontSize: 30}}/>
                <Typography gutterBottom variant="h5">
                    <br/>
                    {props.customer.firstname} {props.customer.lastname}
                    <br /><br />
                </Typography>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    component={Link}
                    to={"/admin/customerinfopage/" + props.customer.id}
                >
                    View
                </Button>
                <Button className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    component={Link}
                    to={"/admin/editcustomer/" + props.customer.id}
                >
                    Edit
                </Button>
                <Button className={classes.button}
                    disabled={disableDeleteButton}
                    onClick={deleteCustomer}
                    variant="contained"
                    color="secondary"
                    disableElevation
                >
                    Delete
                </Button>
            </CardContent>

        </Card >

        // <div className="SingleCustomer Box">
        //     <br/>
        // 	<span>Customer ID: </span>{props.customer.id}<br/>
        //     <span>Email: </span>{props.customer.email}<br/>
        //     <span>First Name: </span>{props.customer.firstname}<br/>
        //     <span>Last Name: </span>{props.customer.lastname}<br/>
        //     <br/>
        //     <NavLink to={"/admin/editcustomer/"+props.customer.id}>
        //     <button>Edit</button><br/><br/>
        //     </NavLink>
        //     <button disabled={disableDeleteButton} onClick={deleteCustomer}>Delete</button><br/><br/>
        //     <NavLink to={"/admin/customerinfopage/"+props.customer.id}>
        //     <button>View</button><br/><br/>
        //     </NavLink>
        // </div>
    );
}

export default SingleCustomer;
