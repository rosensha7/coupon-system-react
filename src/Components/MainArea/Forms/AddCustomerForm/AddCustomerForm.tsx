import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import jwtAxios from "../../../Auth/jwtAxios";
import "./AddCustomerForm.css";
import "../../../Auth/Login/Login.css";

function AddCustomerForm(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<Customer>({
        mode: "onChange",
        reValidateMode: "onChange"
    });
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:Customer){
        await jwtAxios.post<Customer>("http://localhost:8080/admin/addcustomer",customer)
            .then(response => {
                console.log("Response is: " + response);
                history.push("/FormSubmitted");
            })
            .catch((reason: AxiosError) => {
                if (reason.response!.status === 400) {
                    console.log("Error 400 was given. (customer)");
                } else {
                    console.log("An error occurred.")
                }
                console.log(reason.message);
                history.push("/FormSubmitFailed");
            });
    }

    return (
        <div className="FormStyler text-center">
            <form onSubmit={handleSubmit(send)}>
			<h2>Add Customer</h2>
                <div className="form-group">
                <input className="form-control" type="text" name="firstname" placeholder="First name" ref={register({required:true, minLength:3, pattern: /^[A-Z].+$/})}/>
                {errors.firstname?.type==="minLength" && <span><br/>Must have 3 letters</span>}
                {errors.firstname?.type==="required" && <span><br/>You must enter a name</span>}
                {errors.firstname?.type==="pattern" && <span><br/>You must start with capital letter</span>} 
                <br/>
                <input className="form-control" type="text" name="lastname" placeholder="Last name" ref={register({required:true, minLength:3, pattern: /^[A-Z].+$/})}/>
                {errors.lastname?.type==="minLength" && <span><br/>Must have 3 letters</span>}
                {errors.lastname?.type==="required" && <span><br/>You must enter a name</span>}
                {errors.lastname?.type==="pattern" && <span><br/>You must start with capital letter</span>} 
                <br/>
                <input className="form-control" type="text" name="email" placeholder="Email" ref={register({required:true, minLength:3, pattern: /^\S+@\S+\.\S+$/})}/>
                {errors.email?.type==="minLength" && <span><br/>Must have 4 letters atleast</span>}
                {errors.email?.type==="required" && <span><br/>You must enter an email</span>}
                {errors.email?.type==="pattern" && <span><br/>You must enter a valid email address</span>} 
                <br/>
                <input className="form-control" type="password" name="password" placeholder="Password" ref={register({required:true, minLength:3, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})}/>
                {errors.password && errors.password?.type==="minLength" && <span><br/>Must have 8 letters</span>}
                {errors.password && errors.password?.type==="required" && <span><br/>You must enter a password</span>}
                {errors.password && errors.password?.type==="pattern" && <span><br/>You must have 8 characters with numbers and letters</span>}
                <br/><br/>
                <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddCustomerForm;
