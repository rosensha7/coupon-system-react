import { AxiosError } from 'axios';
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import { useState, useEffect } from 'react';
import "./EditCustomerForm.css";
import { SyntheticEvent } from 'react';
import jwtAxios from '../../../Auth/jwtAxios';
import store from '../../../../Redux/Store';
import { ClientType } from '../../../Enums/ClientType';


interface EditCustomerFormProps{
    id:string
}

function EditCustomerForm(props:EditCustomerFormProps): JSX.Element {

    const history = useHistory();
    const [customer, setCustomer] = useState(new Customer);
    const [isAdmin, setIsAdmin] = useState((store.getState().authState.user 
                                            && store.getState().authState.user.clientType==ClientType.Administrator))
    const {register, handleSubmit, errors} = useForm<Customer>({
        mode: "onChange",
        reValidateMode: "onChange"
    });
    const changeState = (args:SyntheticEvent) => {
        const {value, name} = args.target as HTMLInputElement; 
        setCustomer({ ...customer, [name]: value });
    }

    useEffect(()=>{
        const getCustomerFromServer = async () => {
            const customerDetailData = await jwtAxios.get<Customer>("http://localhost:8080/admin/customer/" + props.id)
            .then(customerDetailData => {
                setCustomer(customerDetailData.data);
            })
            .catch((reason: AxiosError) => {
                if (reason.response!.status === 400) {
                    console.log("Error 400 was given. (Customer getting details from server)");
                } else {
                    console.log("An error occurred.")
                }
                console.log(reason.message);
                history.push("/404");
            });
        }
        getCustomerFromServer();
    }, []);


    async function send(formCustomer:Customer){
        formCustomer.id = customer.id;
        await jwtAxios.put<Customer>("http://localhost:8080/admin/editcustomer",formCustomer)
            .then(response => {
                console.log("Response is: " + response);
                history.push("/FormSubmitted");
            })
            .catch((reason: AxiosError) => {
                if (reason.response!.status === 400) {
                    console.log("Error 400 was given. (Customer)");
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
                    <h2>Edit Customer</h2>
                    <div className="form-group">
                    <br/>
                    <span>First Name</span>
                    <input className="form-control" type="text" name="firstname" defaultValue={customer.firstname} placeholder="Customer first name" onChange={changeState} ref={register({required:true, minLength:3, pattern: /^[A-Z].+$/})}/>
                    {errors.firstname?.type==="minLength" && <span>Must have 3 letters</span>}
                    {errors.firstname?.type==="required" && <span>You must enter a name</span>}
                    {errors.firstname?.type==="pattern" && <span>You must start with capital letter</span>} 
                    <br/><br/>
                    <span>Last Name</span>
                    <input className="form-control" type="text" name="lastname" defaultValue={customer.lastname} placeholder="Customer last name" onChange={changeState} ref={register({required:true, minLength:3, pattern: /^[A-Z].+$/})}/>
                    {errors.lastname?.type==="minLength" && <span>Must have 3 letters</span>}
                    {errors.lastname?.type==="required" && <span>You must enter a name</span>}
                    {errors.lastname?.type==="pattern" && <span>You must start with capital letter</span>} 
                    <br/><br/>
                    <span>Email</span>
                    <input className="form-control" type="text" name="email" defaultValue={customer.email} placeholder="Email" onChange={changeState} ref={register({required:true, minLength:3, pattern: /^\S+@\S+\.\S+$/})}/>
                    {errors.email?.type==="minLength" && <span>Must have 4 letters atleast</span>}
                    {errors.email?.type==="required" && <span>You must enter an email</span>}
                    {errors.email?.type==="pattern" && <span>You must enter a valid email address</span>} 
                    <br/><br/>
                    <span>Password</span>
                    <input className="form-control" type="password" name="password" defaultValue={customer.password} placeholder="Password" onChange={changeState} ref={register({required:true, minLength:3, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})}/>
                    {errors.password && errors.password?.type==="minLength" && <span>Must have 8 letters</span>}
                    {errors.password && errors.password?.type==="required" && <span>You must enter a name</span>}
                    {errors.password && errors.password?.type==="pattern" && <span>You must have 8 characters with numbers and letters</span>}
                    <br/><br/>
                    <button type="submit" className="btn btn-primary">Edit</button>
                    </div>
                </form>
            </div>
            )
        }
    }

    return (
        <div>
            {showFormIfAdmin()}
        </div>
    );


}

export default EditCustomerForm;
