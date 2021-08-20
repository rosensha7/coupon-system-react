class Coupon{
    id:number=0;
    description?:string="";
    title:string="";
    amount:number=0;
    image:string="";
    price:number=0;
    startDate:Date = new Date;
    endDate:Date = new Date;
    categoryId:string="NONE";
    companyId:string="";
}

export default Coupon;