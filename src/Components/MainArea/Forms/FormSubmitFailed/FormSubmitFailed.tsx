import "./FormSubmitFailed.css";
import {useEffect} from "react";
import { NavLink, useHistory } from "react-router-dom";

function FormSubmitFailed(): JSX.Element {
    const history = useHistory();

    useEffect( ()=> {
        setTimeout(() => { 
            history.push('/home')
        }, 7000)
    }, []);

    
    return (
        <div className="FormSubmitFailed content">
                <div className="FormSubmitFailed wrapper-1">
                    <div className="FormSubmitFailed wrapper-2">
                        <h1>Something went wrong</h1>
                        <p>It seems the action you tried to do failed. </p>
                        <p>Please try again later or make sure your input is valid. </p>
                        <p>You'll be redirected in a couple of seconds. </p>
                    </div>
                </div>
            </div>
    );
}

export default FormSubmitFailed;
