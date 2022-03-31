import http from "./http-common";

class RestClientServices {

  // get data
  async getAll(API_URL_TYPE) {
    return await http.get(API_URL_TYPE);
  }
  
  // post data with body
  async postWithData(API_URL_TYPE, data) {
    return await http.post(API_URL_TYPE, data);
  }
 
  // post data without body 
  async postWithoutData(API_URL_TYPE) {
    return await http.post(API_URL_TYPE);
  }
}

export default new RestClientServices();