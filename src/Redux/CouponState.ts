import { convertTypeAcquisitionFromJson } from "typescript";
import Coupon from "../Models/Coupon";

export class CouponState{
    public coupons:Coupon[] = [];
}

export enum CouponActionType{
    //maybe need to add "getOneCoupon"
    CouponDownloaded="CouponDownloaded",
    CouponAdded = "CouponAdded",
    CouponUpdated = "CouponUpdated",
    CouponDelete = "CouponDelete"
}

export interface CouponAction{
    type:CouponActionType;
    payload?: any;
}

export function couponDownloadedAction(coupons: Coupon[]):CouponAction{
    return {type: CouponActionType.CouponDownloaded, payload:coupons}
}
export function couponAddedAction(coupon: Coupon):CouponAction{
    return {type: CouponActionType.CouponAdded, payload:coupon}
}

export function couponUpdateAction(coupon: Coupon):CouponAction{
    return {type: CouponActionType.CouponUpdated, payload:coupon}
}

export function couponDeleteAction(id:number):CouponAction{
    return {type: CouponActionType.CouponDelete, payload:id}
}


//reducer
export function couponReducer(currentState: CouponState = new CouponState, action:CouponAction):CouponState{
    const newState = {...currentState};

    switch(action.type){
        case CouponActionType.CouponDownloaded:
            newState.coupons = action.payload;
            break;
        case CouponActionType.CouponAdded:
            console.log("New coupon added to store: ", action.payload )
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.CouponUpdated:
            const indexUpdate = newState.coupons.findIndex(obj=>obj.id == action.payload.id);
            newState.coupons.splice(indexUpdate, 1, action.payload);
            break;
        case CouponActionType.CouponDelete:
            const indexDelete = newState.coupons.findIndex(obj=>obj.id == action.payload.id);
            newState.coupons.splice(indexDelete, 1);
            break;
    }
    return newState;
}