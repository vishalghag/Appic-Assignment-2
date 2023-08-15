import axios from "axios";
import { BaseUrl} from "../constant";
const SecureAxios = axios.create({
  baseURL:BaseUrl
});

// SecureAxios.interceptors.request.use(
//     config=>{
//         config.headers['Authorization'] ='token'
//         return config
//     }

// )

export default SecureAxios;
