import Coupon from "./Coupon";

class Customer{
    id:number=0;
    firstname:string="";
    lastname:string="";
    email:string="";
    password:string="";

    couponList:Coupon[] = [];
}

export default Customer;