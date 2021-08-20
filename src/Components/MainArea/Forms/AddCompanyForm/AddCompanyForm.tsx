import { AxiosError } from 'axios';
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import Company from "../../../../Models/Company";
import { useState } from 'react';
import "./AddCompanyForm.css";
import "../../../Auth/Login/Login.css";
import store from '../../../../Redux/Store';
import jwtAxios from '../../../Auth/jwtAxios';

function AddCompanyForm(): JSX.Element {

    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState((store.getState().authState.user && store.getState().authState.user.clientType=="Administrator"))
    const {register, handleSubmit, errors} = useForm<Company>({
        mode: "onChange",
        reValidateMode: "onChange"
    });

    async function send(company:Company){
        await jwtAxios.post<Company>("http://localhost:8080/admin/addcompany",company)
            .then(response => {
                console.log("Response is: " + response);
                history.push("/FormSubmitted");
            })
            .catch((reason: AxiosError) => {
                if (reason.response!.status === 400) {
                    console.log("Error 400 was given. (company)");
                } else {
                    console.log("An error occurred.")
                }
                console.log(reason.message);
                history.push("/FormSubmitFailed");
            });
    }

    const showFormIfAdmin = ()=>{
        if(!isAdmin){
            return (<Redirect to="/404" exact/>)
        }
        else{
            return (
            <div className="FormStyler text-center">
                <form onSubmit={handleSubmit(send)}>
                    <h2>Add Company</h2>
                    <div className="form-group">
                    <br/><br/>
                    <input className="form-control" type="text" name="name" placeholder="Company name" ref={register({required:true, minLength:3, pattern: /^[A-Z].+$/})}/>
                    {errors.name?.type==="minLength" && <span><br/>Must have 3 letters</span>}
                    {errors.name?.type==="required" && <span><br/>You must enter a name</span>}
                    {errors.name?.type==="pattern" && <span><br/>You must start with capital letter</span>} 
                    <br/><br/>
                    <input className="form-control" type="text" name="email" placeholder="Email" ref={register({required:true, minLength:3, pattern: /^\S+@\S+\.\S+$/})}/>
                    {errors.email?.type==="minLength" && <span><br/>Must have 4 letters atleast</span>}
                    {errors.email?.type==="required" && <span><br/>You must enter an email</span>}
                    {errors.email?.type==="pattern" && <span><br/>You must enter a valid email address</span>} 
                    <br/><br/>
                    <input className="form-control" type="password" name="password" placeholder="Password" ref={register({required:true, minLength:3, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})}/>
                    {errors.password?.type==="minLength" && <span><br/>Must have 8 letters</span>}
                    {errors.password?.type==="required" && <span><br/>You must enter a name</span>}
                    {errors.password?.type==="pattern" && <span><br/>You must have 8 characters with numbers and letters</span>}
                    <br/><br/>
                    <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
            )
        }
    }

    return (
        <div >
            {showFormIfAdmin()}
        </div>
    );
}

export default AddCompanyForm;