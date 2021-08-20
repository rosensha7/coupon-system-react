import "./CreateCouponForm.css";
import { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import Select from "react-select";
import Coupon from "../../../../Models/Coupon";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import store from "../../../../Redux/Store";
import { ClientType } from "../../../Enums/ClientType";
import jwtAxios from "../../../Auth/jwtAxios";
import { couponAddedAction } from "../../../../Redux/CouponState";

function CreateCouponForm(): JSX.Element {

    const dateFormat = require('dateformat');
    const [categoryOptions, setCategoryOptions] = useState({ selectOptions: [] });
    const [isCompany, setIsCompany] = useState(store.getState().authState.user && store.getState().authState.user.clientType==ClientType.Company);
    const history = useHistory();
    const { register, handleSubmit, errors, control } = useForm<Coupon>({
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const [startDateState, setStartDateState] = useState(new Date);
    const [endDateState, setEndDateState] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));

    useEffect(() => {
        const loadCategoriesFromServer = async () => {
            const response = await axios.get("http://localhost:8080/guest/categories");
            const mapToOptions = response.data.map((c: string) => ({
                "value": c,
                "label": c
            }))
            setCategoryOptions({ selectOptions: mapToOptions });
        }
        loadCategoriesFromServer();
    }, []);

    async function send(coupon: Coupon) {
        coupon.companyId = "0";
        coupon.startDate = dateFormat(coupon.startDate, "yyyy-mm-dd");
        coupon.endDate = dateFormat(coupon.endDate, "yyyy-mm-dd");
        console.log("This is the coupon: ");
        console.log(coupon);
        await jwtAxios.post<Coupon>("http://localhost:8080/company/coupon", coupon)
            .then(response => {
                coupon.id = response.data.id;
                store.dispatch(couponAddedAction(coupon));
                history.push("/FormSubmitted");
            })
            .catch((reason: AxiosError) => {
                if (reason.response!.status === 400) {
                    console.log("Error 400 was given.")
                } else {
                    console.log("An error occurred.")
                }
                console.log(reason.message);
                history.push("/FormSubmitFailed");
            });
    }

    const showFormIfCompany = ()=>{
        if(!isCompany)
            return (<Redirect to="/404" exact/>)

        return (
            <div className="FormStyler text-center">
            <form onSubmit={handleSubmit(send)}>
                <h2>Add Coupon</h2>
                <div className="form-group">
                <br />
                <input className="form-control" type="text" name="title" placeholder="Coupon title" ref={register({ required: true, minLength: 3, pattern: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/ })} />
                {errors.title?.type === "minLength" && <span>Must have 3 letters</span>}
                {errors.title?.type === "required" && <span>You must enter a coupon title</span>}
                {errors.title?.type === "pattern" && <span>Please use valid characters</span>}
                <br />
                <input className="form-control" type="text" name="description" placeholder="Coupon description" ref={register({ required: true, minLength: 3, pattern: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/ })} />
                {errors.description?.type === "minLength" && <span>Must have 3 letters</span>}
                {errors.description?.type === "required" && <span>You must enter a coupon description</span>}
                {errors.description?.type === "pattern" && <span>Please use valid characters</span>}
                <br />
                <input className="form-control" type="number" name="price" step="0.001" min="0.00" placeholder="Price" ref={register({ required: true, min: 0 })} />
                {errors.price?.type === "required" && <span>You must enter a coupon description</span>}
                {errors.amount?.type === "min" && <span>Price can't be negative</span>}
                <br />
                <input className="form-control" type="number" name="amount" placeholder="Amount" ref={register({ required: true, min: 1 })} />
                {errors.amount?.type === "required" && <span>You must enter an amount</span>}
                {errors.amount?.type === "min" && <span>Please enter a positive number</span>}
                <br />
                <Controller 
                    control={control}
                    name="categoryId"
                    render={({ onChange, value, ref }) => (
                        <Select
                            inputRef={ref}
                            options={categoryOptions.selectOptions}
                            value={categoryOptions.selectOptions.find(c => c.value === value)}
                            onChange={val => onChange(val.value)}
                            placeholder = "Select a category..."
                            />
                    )}
                />
                <br />
                <Controller
                    name="startDate"
                    control={control}
                    defaultValue={null}
                    render={({ onChange, value }) => (
                        <ReactDatePicker onChange={(e) => {
                            setStartDateState(new Date(e.toString()));
                            onChange(e);
                        }}
                            selected={value}
                            placeholderText="Select a start date..."
                            minDate={new Date}
                            maxDate={endDateState}
                            showYearDropdown
                            scrollableMonthYearDropdown
                            required
                        />
                    )}
                />
                <br /> <br />
                <Controller
                    name="endDate"
                    control={control}
                    defaultValue={null}
                    render={({ onChange, value }) => (
                        <ReactDatePicker onChange={(e) => {
                            setEndDateState(new Date(e.toString()))
                            onChange(e)
                        }}
                            selected={value}
                            placeholderText="Select an end date..."
                            minDate={startDateState}
                            isClearable
                            showYearDropdown
                            scrollableMonthYearDropdown
                            required
                        />
                    )}
                />
                <br /><br />
                {/* <input className="form-control" type="text" name="image" placeholder="Image URL" ref={register({ minLength: 3, pattern: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/ })} /> */}
                {/* {errors.image?.type === "pattern" && <span>Please enter a valid URL</span>} */}
                {/* <br /><br />
                <input type="file" name="image"/>
                <br /><br /> */}
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        )
    }

    return (
        <div>
            {showFormIfCompany()}
        </div>
    );

}

export default CreateCouponForm;
