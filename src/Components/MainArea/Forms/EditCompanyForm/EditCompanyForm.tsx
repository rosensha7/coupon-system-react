import { AxiosError } from 'axios';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import Company from "../../../../Models/Company";
import { useState, useEffect, SyntheticEvent, Suspense } from 'react';
import "./EditCompanyForm.css";
import jwtAxios from '../../../Auth/jwtAxios';
import store from '../../../../Redux/Store';
import { ClientType } from '../../../Enums/ClientType';
import "../../../Auth/Login/Login.css";

interface EditCompanyFormProps{
    id:string
}

function EditCompanyForm(props:EditCompanyFormProps): JSX.Element {

    const history = useHistory();
    const [company, setCompany] = useState(new Company);
    const [isAdmin, setIsAdmin] = useState((store.getState().authState.user 
                                            && store.getState().authState.user.clientType==ClientType.Administrator))
    const {register, handleSubmit, errors} = useForm<Company>({
        mode: "onChange",
        reValidateMode: "onChange"
    });
    const changeState = (args:SyntheticEvent) => {
        const {value, name} = args.target as HTMLInputElement; 
        setCompany({ ...company, [name]: value });
    }

    useEffect(()=>{
        const getCompanyFromServer = async () => {
            const companyDetailData = await jwtAxios.get<Company>("http://localhost:8080/admin/company/" + props.id)
            .then(companyDetailData => {
                setCompany(companyDetailData.data);
                setIsAdmin(true);
            })
            .catch((reason: AxiosError) => {
                if (reason.response!.status === 400) {
                    console.log("Error 400 was given. (company getting details from server)");
                } else {
                    console.log("An error occurred.")
                }
                console.log(reason.message);
                setIsAdmin(false);
            });
        }
        getCompanyFromServer();
    }, []);

    async function send(formCompany:Company){
        formCompany.id = company.id;
        await jwtAxios.put<Company>("http://localhost:8080/admin/editcompany",formCompany)
            .then(response => {
                console.log("Response for sending company update is: ", response);
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
        if(!isAdmin)
            return (<Redirect to="/404" exact/>)

        return (
            <div className="FormStyler text-center">
                <form onSubmit={handleSubmit(send)}>
                <h2>Edit Company</h2>
                <div className="form-group">
                    <br/>
                    <input className="form-control" type="text" name="name" defaultValue={company.name} placeholder="Company name" onChange={changeState} ref={register({required:true, minLength:3, pattern: /^[A-Za-z].+$/})}/>
                    {errors.name?.type==="minLength" && <span><br/>Must have 3 letters</span>}
                    {errors.name?.type==="required" && <span><br/>You must enter a name</span>}
                    {errors.name?.type==="pattern" && <span><br/>You must start with a letter</span>} 
                    <br/>
                    <input className="form-control" type="text" name="email" defaultValue={company.email} placeholder="Email" onChange={changeState} ref={register({required:true, minLength:3, pattern: /^\S+@\S+\.\S+$/})}/>
                    {errors.email?.type==="minLength" && <span><br/>Must have 4 letters atleast</span>}
                    {errors.email?.type==="required" && <span><br/>You must enter an email</span>}
                    {errors.email?.type==="pattern" && <span><br/>You must enter a valid email address</span>} 
                    <br/>
                    <input className="form-control" type="password" name="password" defaultValue={company.password} placeholder="Password" onChange={changeState} ref={register({required:true, minLength:3, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})}/>
                    {errors.password && errors.password?.type==="minLength" && <span><br/>Must have 8 letters</span>}
                    {errors.password && errors.password?.type==="required" && <span><br/>You must enter a password</span>}
                    {errors.password && errors.password?.type==="pattern" && <span><br/>You must have 8 characters with numbers and letters (upper and lower case)</span>}
                    <br/><br/>
                    <button type="submit" className="btn btn-primary">Change</button>
                    </div>
                </form>
            </div>)
    }

    return (
        <div>
            {showFormIfAdmin()}
        </div>
    );
}
export default EditCompanyForm;
