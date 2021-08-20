import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isLoggedAction, logoutAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";

function Logout(): JSX.Element {
    const history=useHistory();
    useEffect(()=>{
        store.dispatch(logoutAction());
        store.dispatch(isLoggedAction(false));
        notify.success("You are now logged out.");
        history.push("/home");
    });
    return null;
}

export default Logout;
