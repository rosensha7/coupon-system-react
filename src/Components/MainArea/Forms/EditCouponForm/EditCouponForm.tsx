import axios from 'axios';
import { Controller, useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import Coupon from "../../../../Models/Coupon";
import { useState, useEffect } from 'react';
import "./EditCouponForm.css";
import { SyntheticEvent } from 'react';
import Select from "react-select";
import jwtAxios from '../../../Auth/jwtAxios';
import store from '../../../../Redux/Store';
import { ClientType } from '../../../Enums/ClientType';

interface EditCouponFormProps {
    id: string
}

function EditCouponForm(props: EditCouponFormProps): JSX.Element {

    const [coupon, setCoupon] = useState(new Coupon);
    const [categoryOptions, setCategoryOptions] = useState({ selectOptions: [] });
    const [isCompany, setIsCompany] = useState((store.getState().authState.user && store.getState().authState.user.clientType == ClientType.Company));
    const [startDateState, setStartDateState] = useState(new Date);
    const [endDateState, setEndDateState] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    const { register, handleSubmit, errors, control, reset } = useForm<Coupon>({
        mode: "onChange",
        reValidateMode: "onChange"
    });
    const changeState = (args: SyntheticEvent) => {
        const { value, name } = args.target as HTMLInputElement;
        setCoupon({ ...coupon, [name]: value });
    }
    const history = useHistory();
    const dateFormat = require('dateformat');

    useEffect(() => {
        const loadCategoriesFromServer = async () => {
            const response = await axios.get("http://localhost:8080/guest/categories");
            const mapToOptions = response.data.map((c: string) => ({
                "value": c,
                "label": c
            }))
            setCategoryOptions({ selectOptions: mapToOptions });
        }
        const getCouponFromServer = async () => {
            console.log("id: " + props.id);
            await jwtAxios.get<Coupon>("http://localhost:8080/company/coupon/" + props.id)
                .then(couponDetailData => {
                    console.log(couponDetailData);
                    setCoupon(couponDetailData.data);
                    reset(couponDetailData.data);
                })
                .catch(error => {
                    console.log(error.message);
                    history.push("/404");
                });
        }
        loadCategoriesFromServer();
        getCouponFromServer();
    }, [reset]);

    async function send(formCoupon: Coupon) {
        formCoupon.id = coupon.id;
        formCoupon.startDate = coupon.startDate;
        formCoupon.endDate = coupon.endDate;
        await jwtAxios.put<Coupon>("http://localhost:8080/company/editcoupon", formCoupon)
            .then(response => {
                history.push("/FormSubmitted");
            })
            .catch(error => {
                console.log(error.message);
                history.push("/FormSubmitFailed");
            });
    }

    const showFormIfCompany = () => {
        if (!isCompany)
            return (<Redirect to="/404" exact />)

        return (
            <div className="FormStyler text-center">
                <form onSubmit={handleSubmit(send)}>
                    <h2>Edit Coupon</h2>
                    <div className="form-group">
                        <input className="form-control" type="text" name="title" defaultValue={coupon.title} placeholder="Coupon title" onChange={changeState} ref={register({ required: true, minLength: 3 })} />
                        {errors.title?.type === "minLength" && <span>Must have at least 3 letters</span>}
                        {errors.title?.type === "required" && <span>You must enter a name</span>}
                        <br />
                        <input className="form-control" type="textarea" name="description" defaultValue={coupon.description} placeholder="Coupon description" onChange={changeState} ref={register({ required: true, minLength: 3, maxLength: 250 })} />
                        {errors.description?.type === "minLength" && <span>Must have at least 3 letters</span>}
                        {errors.description?.type === "maxLength" && <span>Must be no more than 250 characters</span>}
                        {errors.description?.type === "required" && <span>You must enter a name</span>}
                        <br />
                        <input className="form-control" type="number" name="price" defaultValue={coupon.price} onChange={changeState} step="0.001" min="0.00" placeholder="Price" ref={register({ required: true, min: 0 })} />
                        {errors.price?.type === "required" && <span>You must enter a coupon description</span>}
                        {errors.amount?.type === "min" && <span>Price can't be negative</span>}
                        <br />
                        <input className="form-control" type="number" name="amount" defaultValue={coupon.amount} onChange={changeState} placeholder="Amount" ref={register({ required: true, min: 1 })} />
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
                                    placeholder="Select a category..."
                                />
                            )}
                        />
                        <br />
                        <input className="form-control" type="text" name="image" defaultValue={coupon.price} onChange={changeState} placeholder="Image URL" ref={register({ minLength: 3, pattern: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/ })} />
                        {errors.image?.type === "pattern" && <span>Please enter a valid URL</span>}
                        
                        {/* <input type="file" ref={register} name="image" /> */}
                        <button type="submit" className="btn btn-primary">Edit</button>
                    </div>
                </form>
            </div>)
    }

    return (
        <div>
            {showFormIfCompany()}
        </div>
    );
}

export default EditCouponForm;
