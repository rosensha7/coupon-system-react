import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import UserModel from "../../../Models/UserModel";
import { isLoggedAction, loginAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import notify from "../../../Services/Notify";
import { ClientType } from "../../Enums/ClientType";
import "./Login.css";

function Login(): JSX.Element {
    const history = useHistory(); //redirect function
    const {register,handleSubmit, errors} = useForm<CredentialsModel>({
        mode: "onChange",
        reValidateMode: "onChange"
    });

    async function send(credential: CredentialsModel){
        credential.id = "-1";//because we dont know id at this point
        console.log("credential is: ")
        console.log(credential)
        try{
            const response = await axios.post<UserModel>(
                "http://localhost:8080/jwt/login/submit",credential);
            store.dispatch(loginAction(response.data));
            console.log("received token:"+response.data)
            notify.success("login successful.");
            store.dispatch(isLoggedAction(true));
            history.push("/home");
        } catch(err){
            notify.error("incorrect credentials.");
        }
    }

    return (
        <div className="FormStyler text-center">
			
            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2><br/>
                <div className="form-group">
                <input className="form-control" type="email" name="userEmail" placeholder="Email" ref={register({required:true, minLength:3, pattern: /^\S+@\S+\.\S+$/})}/>
                {errors.userEmail?.type==="required" && <span>You must enter an email</span>}
                {errors.userEmail?.type==="pattern" && <span>You must enter a valid email address</span>}<br/><br/>
                <input className="form-control" type="password" name="password" placeholder="Password" ref={register({required:true, minLength:5, pattern: /^(?=.*[A-Za-z])/})}/>
                {errors.password?.type==="minLength" && <span>Must be atleast 5 characters long</span>}
                {errors.password?.type==="required" && <span><br/>You must enter a name</span>}
                {errors.password?.type==="pattern" && <span><br/>Please enter a valid password</span>}
                <br/><br/>
                <input className="radiobutton" type="radio" name="clientType" value={ClientType.Administrator} ref={register} />Admin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <br/>
                <input className="radiobutton" type="radio" name="clientType" value={ClientType.Customer} ref={register} />Customer
                <br/>
                <input className="radiobutton" type="radio" name="clientType" value={ClientType.Company} ref={register} />Company
                <br/>
                <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
