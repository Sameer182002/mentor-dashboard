import axios  from "axios";
import { cookie } from "./cookies";

function getAxios() {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });


    function onRequestFulfilled(request) {
        // console.log('onRequestFulfilled', request)
        // Do something before request is sent
        request.headers['source'] = 'prepaid-lab'
        const authToken = cookie.taAuthToken;
        if (authToken) request.headers["x-auth-token"] = authToken;

        return request;
    }

    function onRequestRejected(error) {
        // console.error('onRequestRejected', error.response)
        // Do something with request error
        // Retry code, internet connectivity check
        return Promise.reject(new Error(error?.response?.data?.msg || error?.response?.data?.message));
    }

    function onResponseFulfilled(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log("onResponseFulfilled", response);

        const {
            data: { data, status, msg, token },
            config: { url },
        } = response || {data:{}, config:{}};

        if (url === '/ta/verify-otp') {
            cookie.taAuthToken = token
        }

        if (!status) {
            return Promise.reject(new Error(msg));
        }

        return data;
    }


    function onResponseRejected(error) {
        // Do something with response error
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // console.error('onResponseRejected', error.response)
        const {msg, code ,message} = error?.response?.data || {}
        if (code === "logout") {
            cookie.taAuthToken()
            // TODO: save logout reason and show on login page
        }

        return Promise.reject(new Error(msg||message));
    }


    axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected, {synchronous: true })
    axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected, { synchronous: true })

    return axiosInstance
}

let axiosInstance = null

if (!axiosInstance) {
    axiosInstance = getAxios()
}

export default axiosInstance