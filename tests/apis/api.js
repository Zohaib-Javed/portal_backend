const Axios = require("axios");
const sessionStorage=require('sessionstorage');
module.exports = (endPoint, data) => {
    endPoint.data = data;
    switch (endPoint.type) {
        case 'POST':
            return axiosPOST(endPoint);
        case 'post':
            return axiospost(endPoint);
        case 'GET':
            return axiosGet(endPoint);
        case 'put':
            return axiosPutConfig_put(endPoint);
        case 'PUT':
            return axiosPutConfig_PUT(endPoint);
        default:
            break;
    }
}

const axiosPOST = async ({ address: route, data, guarded: isGuarded, testData }) => {
    // console.log('[LINK TO BE APPROACHED] POST ', route);
    return await Axios.post(process.env.BASE_URL + route, data, isGuarded ? {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token"),
        }
    } : null);
}

const axiospost = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] post ', route);
    return Axios({
        url: route,
        method: 'post',
        data,
        headers: isGuarded ? {
            'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token"),
        } : null
    })
}

const axiosGet = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] GET', route + (data ? data : ""));
    return await Axios.get(process.env.BASE_URL + route + (data ? data : ""), isGuarded ? {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token"),
        }
    } : null);
}

const axiosPutConfig_put = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] put', route);
    return await Axios({
        url: route,
        data,
        headers: isGuarded ? {
            'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token"),
            'Access-Control-Allow-Origin': '*',
        } : null,
        method: 'put'
    });
}

const axiosPutConfig_PUT = async ({ address: route, data, guarded: isGuarded, testData }) => {
    console.log('[LINK TO BE APPROACHED] PUT', route);
    return await Axios.put(process.env.BASE_URL + route, data, {
        headers: isGuarded ? {
            'Authorization': 'Bearer ' + sessionStorage.getItem("auth_token"),
            'Access-Control-Allow-Origin': '*',
        } : null
    })
}


const mockAPI = data => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('[THIS DATA IS COMIGN FROM A MOCK JSON]');
        resolve({ data });
    }, 500)
});