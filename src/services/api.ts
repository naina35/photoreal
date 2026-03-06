import axios from 'axios'
import { store } from '../redux/store'
import { logout } from '../redux/auth/authSlice'
 
const api=axios.create({
    baseURL:'https://reet-i4vt.onrender.com',
})

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('accessToken')
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})
api.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config
        if(error.response?.status===401 && !originalRequest._retry){
            if (error.response.data?.error !== 'TokenExpiredError') {
                // it's a different 401 (wrong password, unauthorized, etc) — don't refresh
                    return Promise.reject(error)
            }

            originalRequest._retry=true
            const refreshToken=localStorage.getItem('refreshToken')
            if(!refreshToken){
                store.dispatch(logout())
                return Promise.reject(error)
            }
            try{
                const res=await axios.post('https://reet-i4vt.onrender.com/auth/refreshToken',{
                    refreshToken
                })
                const {accessToken,refreshToken:newRefreshToken}=res.data
                localStorage.setItem('accessToken',accessToken)
                localStorage.setItem('refreshToken',newRefreshToken)
                originalRequest.headers.Authorization=`Bearer ${accessToken}`
                return api(originalRequest)
            }
            catch(refershError){
                store.dispatch(logout())
                return Promise.reject(refershError)
            }
        }
        return Promise.reject(error)
    }
)
export default api