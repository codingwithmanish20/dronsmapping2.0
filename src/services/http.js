import axios from 'axios'
import { getRefreshToken } from '../helper/cookies';
const timeout=15000
const headers={
    Accept:'application/json',
    'Content-Type':'application/json',
}

export const mappingService=axios.create({
    baseURL:'/api',
    credentials:true ,
    timeout,
    headers
})

// mappingService.interceptors.request.use(
//   async  config => {
//     const token = getRefreshToken();
//     const refreshTime = 1 * 60 * 1000;
//     const refreshStartTime = localStorage.getItem('refreshStartTime');
//     const currentTime = new Date().getTime();
//     const diff = currentTime - refreshStartTime;

//     try {
//       if (diff>=refreshTime && token) {
//         const payload={
//       token:token
//         }
//          const res = await axios.put(`${process.env.BASE_URL}/account/regenrate-access-token`,payload)
//         if (res.status === 200) {
//           localStorage.setItem('refreshStartTime', new Date().getTime());
          
//         }
//       }
//     } catch (error) {
//       console.error('Error in request interceptor:', error);
//       // window.location.href="/login"
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export default mappingService;


