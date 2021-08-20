import axios from "axios";
import { retokenizeAction } from "../../Redux/AuthState";
import store from "../../Redux/Store";

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use(request=>{
    request.headers={"Authorization":"Bearer "+store.getState().authState.user?.token}
    return request;
});

jwtAxios.interceptors.response.use(response=>{
    store.dispatch(retokenizeAction(response.headers?.authorization));
    return response;
});

export default jwtAxios;