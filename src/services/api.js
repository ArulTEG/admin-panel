import axios from "axios"

export async function clientAPI(method) {
    const axiosoptions = {
      url: "https://lobby-api-dev.azurewebsites.net/api/client?size=30",
      method: "GET",
    };
  
    const response = await axios(axiosoptions);
    return response.data;
  }

  export async function productAPI(method,id) {
    const axiosoptions = {
      url: `https://lobby-api-dev.azurewebsites.net/api/product?id=${id}`,
      method: "GET",
    };
  
    const response = await axios(axiosoptions);
    return response.data;
  }

  export async function clientDataAPI(method,id) {
    const axiosoptions = {
      url: `https://lobby-api-dev.azurewebsites.net/api/getSubscriptionsForClient?clientId=${id}`,
      method: "GET",
    };
  
    const response = await axios(axiosoptions);
    return response.data;
  }
//   export async function editComponentsAPI(payload) {
//     const axiosoptions = {
//       url: `${CUBE_SERVER_API}/editComponent`,
//       method: "PATCH",
//       data: payload,
//     };
  
//     const response = await axios(axiosoptions);
  
//     return response.data;
//   }