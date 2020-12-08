import Axios from "axios";
import baseURL from "./baseURL";

const instance = Axios.create({
    baseURL: baseURL,
    headers: {
        Authorization : "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        "auth-type": "user",
    }
})

export default instance;