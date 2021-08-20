import { useState } from "react";
import "./SingleCoupon.css";
import Coupon from "../../../Models/Coupon";
import { Link, NavLink } from "react-router-dom";
import store from "../../../Redux/Store";
import jwtAxios from "../../Auth/jwtAxios";
import { ClientType } from "../../Enums/ClientType";
import { useEffect } from "react";
import { useHistory } from "react-router";
import notify from "../../../Services/Notify";
import axios from "axios";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, Typography, ButtonGroup } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  card: {
    // maxWidth: 345,
    // background: '#e3f2fd',
    height: 370,
    borderWidth: 2,
    borderColor: "#005cb2",
    borderRadius: 6
  },
  button: {
    margin: theme.spacing(1),
    color: theme.palette.error.contrastText,
    "&:hover": {
      color: theme.palette.error.contrastText,
      backgroundColor: "#64b5f6"
    }
  },
  buttonGroup: {
    width: "70px",
    margin: 2,
    color: theme.palette.error.contrastText,
    "&:hover": {
      color: theme.palette.error.contrastText,
      backgroundColor: "#64b5f6"
    }
  },
  buttonGroupDelete: {
    width: "70px",
    margin: 2,
    color: theme.palette.error.contrastText,
    "&:hover": {
      color: theme.palette.error.contrastText,
      backgroundColor: "#ff34cb"
    }
  }
}));

interface SingleCouponProps {
  myCoupon: Coupon
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {

  const classes = useStyles();

  const [clientType, setClientType] = useState(store.getState().authState.user?.clientType);
  const [isPurchased, setIsPurchased] = useState(false);
  const [ownedByCompany, setOwnedByCompany] = useState(false);
  const [unsplashId, setUnsplashId] = useState("fjI-lDBoHQoRtlBkEpI0yDPfBQiAo6zCNp6Hkq9RR5g");
  const [photo, setPhoto] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (clientType == ClientType.Customer) {
      const checkIfPurchased = async () => {
        await jwtAxios.get<Coupon[]>("http://localhost:8080/customer/customercoupons")
          .then(response => {
            if (response.data?.some(item => item.id == props.myCoupon.id))
              setIsPurchased(true);
          }).catch(err => {
            console.log(err);
            history.push("/404");
          })
      }
      checkIfPurchased();
    }

    if (clientType == ClientType.Company) {
      const checkOwnedByCompany = async () => {
        await jwtAxios.get<Coupon[]>("http://localhost:8080/company/companycoupons")
          .then(response => {
            if (response.data?.some(item => item.id == props.myCoupon.id))
              setOwnedByCompany(true);
          }).catch(err => {
            console.log(err);
            history.push("/404");
          })
      }
      checkOwnedByCompany();
    }

    const getImageUnsplash = async () => {
      await axios.get("https://api.unsplash.com/search/photos?page=1&query=" + props.myCoupon.title + "&client_id=" + unsplashId + "&per_page=1")
        .then(response => {
          setPhoto(response.data.results);
        }).catch(error => {
          console.log(error);
        });
    }
    getImageUnsplash();
  }, []);


  const getImage = () => {
    return (
      <div>
        {photo.slice(0, 1).map(p => (<img src={p.urls.small} width="100%" height="130" style={{ borderRadius: 6, objectFit: "none" }} />))}
      </div>
    );
  }

  const ButtonSet = () => {
    let isCustomer = (clientType == ClientType.Customer);
    let isCompany = (clientType == ClientType.Company);
    let isAdmin = (clientType == ClientType.Administrator);
    let isLogged = (store.getState().authState.isLogged);
    return (
      <div className="couponButtons">
        {(isCustomer && isPurchased) &&
          <Button disableElevation component={Link} to={"/couponinfopage/" + props.myCoupon.id} variant="contained" color="primary" className={classes.button}>
            View
          </Button>
        }
        {(isCustomer && !isPurchased) &&
          <ButtonGroup>
            <Button disableElevation component={Link} to={"/couponinfopage/" + props.myCoupon.id} variant="contained" color="primary" className={classes.buttonGroup}>
              View
            </Button>
            <Button disableElevation onClick={purchaseCoupon} variant="contained" color="secondary" className={classes.buttonGroupDelete}>
              Buy
            </Button>
          </ButtonGroup>
        }
        {(isCompany && ownedByCompany) &&
          <div>
            <ButtonGroup>
              <Button disableElevation component={Link} to={"/couponinfopage/" + props.myCoupon.id} variant="contained" color="primary" className={classes.buttonGroup}>
                View
              </Button>
              <Button disableElevation component={Link} to={"/company/editcoupon/" + props.myCoupon?.id} variant="contained" color="primary" className={classes.buttonGroup}>
                Edit
              </Button>
              <Button disableElevation onClick={deleteCoupon} variant="contained" color="secondary" className={classes.buttonGroupDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </div>
        }
        {(isCompany && !ownedByCompany) &&
          <div>
            <ButtonGroup>
              <Button disableElevation component={Link} to={"/couponinfopage/" + props.myCoupon.id} variant="contained" color="primary" className={classes.buttonGroup}>
                View
              </Button>
            </ButtonGroup>
          </div>
        }
        {(isAdmin) &&
          <Button disableElevation component={Link} to={"/couponinfopage/" + props.myCoupon.id} variant="contained" color="primary" className={classes.button}>
            View
          </Button>
        }
        {(!isLogged) &&
          <Button disableElevation component={Link} to={"/couponinfopage/" + props.myCoupon.id} variant="contained" color="primary" className={classes.button}>
            View
          </Button>
        }
      </div>
    );
  }

  const deleteCoupon = async () => {
    try {
      let couponID = props.myCoupon.id;
      let url = "http://localhost:8080/company/coupon/" + couponID;
      await jwtAxios.delete(url);
      notify.success("Coupon was successfully deleted")
    } catch (error) {
      console.log(error.response.data);
      notify.error("Deleting process failed");
    }
  }

  const purchaseCoupon = async () => {
    try {
      let couponID = props.myCoupon.id;
      let url = "http://localhost:8080/customer/purchasecoupon/";
      await jwtAxios.post(url, props.myCoupon)
        .then(response => {
          setIsPurchased(true);
          notify.success("Coupon purchased.")
        })
    } catch (error) {
      console.log(error.response.data);
      notify.error(error.response.data?.value);
    }
  }

  const theImage = getImage()

  const theCoupon = () => {
    return (
      <Card variant="outlined" className={classes.card} style={{ padding: 20 }}>

        {getImage()}
        <CardContent>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p" align="left">
            Category: {props.myCoupon.categoryId}
          </Typography>
          <Typography gutterBottom variant="h5">
            {props.myCoupon.title}
          </Typography>
          <Typography variant="h6" component="p" align="left">
            {props.myCoupon.price} $
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="left">
            In Stock: {props.myCoupon.amount}
          </Typography>
        </CardContent>
        <ButtonSet />
      </Card>
    )
  }

  return (
    theCoupon()
  );
}

export default SingleCoupon;


// import { useState } from "react";
// import "./SingleCoupon.css";
// import Coupon from "../../../Models/Coupon";
// import { NavLink } from "react-router-dom";
// import store from "../../../Redux/Store";
// import jwtAxios from "../../Auth/jwtAxios";
// import { ClientType } from "../../Enums/ClientType";
// import { useEffect } from "react";
// import { useHistory } from "react-router";
// import notify from "../../../Services/Notify";
// import axios from "axios";
// import { couponDeleteAction } from "../../../Redux/CouponState";

// interface SingleCouponProps {
//   myCoupon: Coupon
// }

// function SingleCoupon(props: SingleCouponProps): JSX.Element {

//   const [clientType, setClientType] = useState(store.getState().authState.user?.clientType);
//   const [isPurchased, setIsPurchased] = useState(false);
//   const [ownedByCompany, setOwnedByCompany] = useState(false);
//   const [unsplashId, setUnsplashId] = useState("fjI-lDBoHQoRtlBkEpI0yDPfBQiAo6zCNp6Hkq9RR5g");
//   const [photo, setPhoto] = useState([]);
//   const history = useHistory();

//   useEffect(() => {
//     if (clientType == ClientType.Customer) {
//       const checkIfPurchased = async () => {
//         await jwtAxios.get<Coupon[]>("http://localhost:8080/customer/customercoupons")
//           .then(response => {
//             if (response.data?.some(item => item.id == props.myCoupon.id))
//               setIsPurchased(true);
//           }).catch(err => {
//             console.log(err);
//             history.push("/404");
//           })
//       }
//       checkIfPurchased();
//     }

//     if (clientType == ClientType.Company) {
//       const checkOwnedByCompany = async () => {
//         await jwtAxios.get<Coupon[]>("http://localhost:8080/company/companycoupons")
//           .then(response => {
//             if (response.data?.some(item => item.id == props.myCoupon.id))
//               setOwnedByCompany(true);
//           }).catch(err => {
//             console.log(err);
//             history.push("/404");
//           })
//       }
//       checkOwnedByCompany();
//     }

//     const getImageUnsplash = async () => {
//       await axios.get("https://api.unsplash.com/search/photos?page=1&query=" + props.myCoupon.title + "&client_id=" + unsplashId + "&per_page=1")
//         .then(response => {
//           setPhoto(response.data.results);
//         }).catch(error => {
//           console.log(error);
//         });
//     }
//     getImageUnsplash();
//   }, []);


//   const getImage = () => {
//     return (
//       <div>
//         {photo.slice(0,1).map(p => (<img src={p.urls.small} width="300" height="300" />))}
//       </div>
//     );
//   }

//   const ButtonSet = () => {
//     let isCustomer = (clientType == ClientType.Customer);
//     let isCompany = (clientType == ClientType.Company);
//     let isAdmin = (clientType == ClientType.Administrator);
//     let isLogged = (store.getState().authState.isLogged);
//     return (
//       <div className="couponButtons">
//         {(isCustomer && !isPurchased) &&
//           <button onClick={purchaseCoupon}>Purchase</button>
//         }
//         {(isCompany && ownedByCompany) &&
//           <div>
//             <NavLink to={"/company/editcoupon/" + props.myCoupon?.id} exact>
//               <button>Edit</button>
//             </NavLink>
//             <button onClick={deleteCoupon}>Delete</button>
//           </div>
//         }
//         <NavLink to={"/couponinfopage/" + props.myCoupon.id} exact>
//           <button>View</button>
//         </NavLink>
//       </div>
//     );
//   }

//   const deleteCoupon = () => {
//     let couponID = props.myCoupon.id;
//     let url = "http://localhost:8080/company/coupon/" + couponID;
//     jwtAxios.delete(url)
//       .then(response=>{
//         console.log(response);
//         // store.dispatch(couponDeleteAction(props.myCoupon.id));
//         notify.success("Coupon was successfully deleted");
//       }).catch(error=>{
//         notify.error("Failed to delete coupon");
//         console.log(error);
//       })
//   }

//   const purchaseCoupon = async () => {
//     try {
//       let couponID = props.myCoupon.id;
//       let url = "http://localhost:8080/customer/purchasecoupon/";
//       await jwtAxios.post(url, props.myCoupon)
//         .then(response => {
//           setIsPurchased(true);
//           notify.success("Coupon purchased.")
//         })
//     } catch (error) {
//       console.log(error.response.data);
//       notify.error(error.response.data?.value);
//     }
//   }

//   return (
//     <div className="SingleCoupon Box">
//       <span>Title: </span>{props.myCoupon.title}<br />
//       <span>Description: </span><br />{props.myCoupon.description}<br />
//       <span>Category: </span>{props.myCoupon.categoryId}<br />
//       <span>Price: </span>{props.myCoupon.price}<br />
//       <span>In stock: </span>{props.myCoupon.amount}<br />
//       <span>Starts on: </span>{new Date(Date.parse(props.myCoupon.startDate.toString())).toDateString()}<br />
//       <span>Expires: </span>{new Date(Date.parse(props.myCoupon.endDate.toString())).toDateString()}<br />
//       {props.myCoupon.image}<br />
//       <ButtonSet />
//       {getImage()}
//     </div>
//   );
// }

// export default SingleCoupon;
