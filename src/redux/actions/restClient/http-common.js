import axios from "axios";
import { BASE_URL } from "../types";

let user = JSON.parse(localStorage.getItem('userData'));
let token = JSON.parse(localStorage.getItem('token'));
let headers = null;
if(user && token) {

  headers = {
    // 'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
}
export default axios.create({
  baseURL: BASE_URL,
  headers: headers
});