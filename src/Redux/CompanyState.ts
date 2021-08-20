import { convertTypeAcquisitionFromJson } from "typescript";
import Company from "../Models/Company";

export class CompanyState{
    public companies:Company[] = [];
}

export enum CompanyActionType{
    //maybe need to add "getOneCoupon"
    CompanyDownloaded="CompanyDownloaded",
    CompanyAdded = "CompanyAdded",
    CompanyUpdated = "CompanyUpdated",
    CompanyDelete = "CompanyDelete"
}

export interface CompanyAction{
    type:CompanyActionType;
    payload?: any;
}

export function companyDownloadedAction(companies: Company[]):CompanyAction{
    return {type: CompanyActionType.CompanyDownloaded, payload:companies}
}
export function companyAddedAction(company: Company):CompanyAction{
    return {type: CompanyActionType.CompanyAdded, payload:company}
}

export function companyUpdateAction(company: Company):CompanyAction{
    return {type: CompanyActionType.CompanyUpdated, payload:company}
}

export function companyDeleteAction(id:number):CompanyAction{
    return {type: CompanyActionType.CompanyDelete, payload:id}
}

//reducer
export function companyReducer(currentState: CompanyState = new CompanyState, action:CompanyAction):CompanyState{
    const newState = {...currentState};

    switch(action.type){
        case CompanyActionType.CompanyDownloaded:
            newState.companies = action.payload;
            break;
        case CompanyActionType.CompanyAdded:
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.CompanyUpdated:
            const indexUpdate = newState.companies.findIndex(obj=>obj.id == action.payload.id);
            newState.companies.splice(indexUpdate, 1, action.payload);
            break;
        case CompanyActionType.CompanyDelete:
            const indexDelete = newState.companies.findIndex(obj=>obj.id == action.payload.id);
            newState.companies.splice(indexDelete, 1);
            break;
    }
    return newState;
}