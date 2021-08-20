import { convertTypeAcquisitionFromJson } from "typescript";
import Category from "../Models/Category";

export class CategoryState{
    public categories:Category[] = [];
}

export enum CategoryActionType{
    //maybe need to add "getOneCoupon"
    CategoryDownloaded="CategoryDownloaded",
    CategoryAdded = "CategoryAdded",
    CategoryUpdated = "CategoryUpdated",
    CategoryDelete = "CategoryDelete"
}

export interface CategoryAction{
    type:CategoryActionType;
    payload?: any;
}

export function categoryDownloadedAction(categories: Category[]):CategoryAction{
    return {type: CategoryActionType.CategoryDownloaded, payload:categories}
}
export function categoryAddedAction(category: Category):CategoryAction{
    return {type: CategoryActionType.CategoryAdded, payload:category}
}

export function categoryUpdateAction(category: Category):CategoryAction{
    return {type: CategoryActionType.CategoryUpdated, payload:category}
}

export function categoryDeleteAction(id:number):CategoryAction{
    return {type: CategoryActionType.CategoryDelete, payload:id}
}

//reducer
export function categoryReducer(currentState: CategoryState = new CategoryState, action:CategoryAction):CategoryState{
    const newState = {...currentState};

    switch(action.type){
        case CategoryActionType.CategoryDownloaded:
            newState.categories = action.payload;
            break;
        case CategoryActionType.CategoryAdded:
            newState.categories.push(action.payload);
            break;
        case CategoryActionType.CategoryUpdated:
            const indexUpdate = newState.categories.findIndex(obj=>obj.name == action.payload.name);
            newState.categories.splice(indexUpdate, 1, action.payload);
            break;
        case CategoryActionType.CategoryDelete:
            const indexDelete = newState.categories.findIndex(obj=>obj.name == action.payload.name);
            newState.categories.splice(indexDelete, 1);
            break;
    }
    return newState;
}