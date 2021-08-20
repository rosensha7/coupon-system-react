import {Switch, Route, Redirect} from "react-router-dom";
import Login from "../../Auth/Login/Login";
import Logout from "../../Auth/Logout/Logout";
import CouponList from "../../Coupons/CouponList/CouponList";
import AddCompanyForm from "../../MainArea/Forms/AddCompanyForm/AddCompanyForm";
import AddCustomerForm from "../../MainArea/Forms/AddCustomerForm/AddCustomerForm";
import Home from "../../MainArea/Home/Home";
import About from "../../MainArea/Pages/About/About";
import Page404 from "../../MainArea/Pages/Page404/Page404";
import ContactUs from "../../MainArea/Pages/ContactUs/ContactUs";
import CouponInfoPage from "../../Coupons/CouponInfoPage/CouponInfoPage";
import FormSubmitted from "../../MainArea/Forms/FormSubmitted/FormSubmitted";
import CompanyList from "../../Companies/CompanyList/CompanyList";
import CustomerList from "../../Customers/CustomerList/CustomerList";
import CompanyInfoPage from "../../Companies/CompanyInfoPage/CompanyInfoPage";
import CustomerInfoPage from "../../Customers/CustomerInfoPage/CustomerInfoPage";
import CreateCouponForm from "../../MainArea/Forms/CreateCouponForm/CreateCouponForm";
import FormSubmitFailed from "../../MainArea/Forms/FormSubmitFailed/FormSubmitFailed";
import EditCompanyForm from "../../MainArea/Forms/EditCompanyForm/EditCompanyForm";
import EditCustomerForm from "../../MainArea/Forms/EditCustomerForm/EditCustomerForm";
import EditCouponForm from "../../MainArea/Forms/EditCouponForm/EditCouponForm";
import CustomerCoupons from "../../Coupons/CustomerCoupons/CustomerCoupons";
import CategoriesPage from "../../MainArea/Categories/CategoriesPage";
import CouponsByCategory from "../../Coupons/CouponsByCategory/CouponsByCategory";
import CompanyCoupons from "../../Companies/CompanyCoupons/CompanyCoupon";

function Routing(): JSX.Element {
    return (
        <div className="Routing">          
            <Switch>
                <Route path="/about" component={About} exact />
                <Route path="/contact" component={ContactUs} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/logout" component={Logout} exact />
                <Route path="/allcoupons" component={CouponList} exact />
                <Route path="/allcompanies" component={CompanyList} exact />
                <Route path="/admin/allcustomers" component={CustomerList} exact />
                <Route path="/home" component={Home} exact />
                <Route path="/admin/addcustomer" component={AddCustomerForm} exact />
                <Route path="/admin/addcompany" component={AddCompanyForm} exact />
                <Route path="/company/createcoupon" component={CreateCouponForm} exact />
                <Route path="/formSubmitted" component={FormSubmitted} exact />
                <Route path="/formSubmitFailed" component={FormSubmitFailed} exact />
                <Route path="/couponinfopage/:id" render={(props)=> <CouponInfoPage id={props.match.params.id}/>} exact />
                <Route path="/companyinfopage/:id" render={(props)=> <CompanyInfoPage id={props.match.params.id}/>} exact />
                <Route path="/admin/customerinfopage/:id" render={(props)=> <CustomerInfoPage id={props.match.params.id}/>} exact />
                <Route path="/admin/editcompany/:id" render={props =><EditCompanyForm {...props.match.params}/>} exact />
                <Route path="/admin/editcustomer/:id" render={props =><EditCustomerForm {...props.match.params}/>} exact />
                <Route path="/company/editcoupon/:id" render={props =><EditCouponForm {...props.match.params}/>} exact />
                <Route path="/customer/details" render={props =><CustomerCoupons/>} exact />
                <Route path="/categories" component={CategoriesPage} exact/>
                <Route path="/couponsincategory/:name" render={(props)=><CouponsByCategory name={props.match.params.name}/>} exact/>
                <Route path="/company/details" render={props =><CompanyCoupons/>} exact />
                <Redirect from="/" to="/home" exact />
                <Route component={Page404}/>
                
            </Switch>    
        </div>
    );
}

export default Routing;