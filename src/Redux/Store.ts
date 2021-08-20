import { customerReducer, CustomerState } from './CustomerState';
import { categoryReducer, CategoryState } from './CategoryState';
import { combineReducers, createStore } from "redux";
import { companyReducer } from "./CompanyState";
// import { authReducer } from "./AuthState";
// import { carReducer } from "./CarState";
import { couponReducer } from "./CouponState";
import { authReducer } from './AuthState';

//MultiPlate reducers:
const reducers = combineReducers({
    authState: authReducer,
    couponState:couponReducer, 
    companyState:companyReducer,
    categoryState:categoryReducer,
    customerState: customerReducer
    });
const store = createStore(reducers);

//for getting data from store in multi reducers type
//store.getState().carState.cars;

export default store;