import axios from "axios";


axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken!==null){
            config.headers.Authorization = accessToken;
        }
        return config;
    }
)

const getAccessToken = async() => {
    try{
        const res = await axios.get("/api/member/reissue");
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken",res.data.accessToken);
    }
    catch (e){
        console.log(e);
        alert("인증 오류");
    }
}

axios.interceptors.response.use(
    (res) => res,
    async (err) => {
        const { config, response: {status} } = err;

        if (config.url === "/api/member/reissue" || status !== 401 || config.sent){
            return Promise.reject(err);
        }
        config.sent = true;
        await getAccessToken();
        if (localStorage.getItem("accessToken") !== null) {
            config.headers.Authorization = localStorage.getItem("accessToken");
        }

        return axios(config);
    }
)