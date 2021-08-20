import { ClientType } from './../Components/Enums/ClientType';
import Company from "../Models/Company";
import CredentialsModel from "../Models/CredentialsModel";
import Customer from "../Models/Customer";
import UserModel from "../Models/UserModel";
import jwt_decode from "jwt-decode";

export class AuthState {
    public user: UserModel = new UserModel;
    public isLogged: boolean = false;
    public constructor() {

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            const decode = JSON.parse(JSON.stringify(jwt_decode(storedUser.token)));
            console.log("decode exp:");
            console.log(decode.exp);
            console.log(Date.now() / 1000);
            if (decode.exp < Date.now() / 1000) {
                this.isLogged = false;
                localStorage.clear();
            } else{
                this.user = storedUser;
                this.isLogged = true;
            }

            console.log("stored user in local storage: ");
            console.log(storedUser);
        }
    }
}

//auth action types
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout",
    isLogged = "IsLogged",
    Retokenize = "Retokenize"
}

//auth action
export interface AuthAction {
    type: AuthActionType,
    payload?: any
}

//auth action creators
export function registerAction(user: CredentialsModel): AuthAction {
    return { type: AuthActionType.Register, payload: user }
}
export function loginAction(user: UserModel): AuthAction {
    return { type: AuthActionType.Login, payload: user }
}
export function retokenizeAction(userToken: string): AuthAction {
    return { type: AuthActionType.Retokenize, payload: userToken }
}
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout }
}
export function isLoggedAction(isLogged: boolean): AuthAction {
    return { type: AuthActionType.isLogged, payload: isLogged }
}

//auth reducer
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch (action.type) {
        case AuthActionType.Register:
        //here the payload is the registred user sent from the server
        //we deleted the newStateUser and AuthAction, since we combine it
        case AuthActionType.Login:
            newState.user = {...action.payload, userEmail: action.payload?.email};
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.Retokenize:
            console.log("reached reauthenticate in reducer");
            let decode = JSON.parse(JSON.stringify(jwt_decode(action.payload)));
            let userDetails = { userEmail: decode.sub, clientType: decode.clientType, token: (action.payload) };
            console.log("decode: ")
            console.log(decode)
            console.log("user details: ");
            console.log(userDetails);
            newState.user = userDetails;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout:
            newState.user = null;
            localStorage.removeItem("user");
            break;
        case AuthActionType.isLogged:
            newState.isLogged = action.payload;
            break;
    }
    return newState;
}
