import { mappingService } from "../http"

export const register = {
    async signup(user) {
        return await mappingService.post('/account/signup',user)
    },
    async login({email,password}) {
        const body = JSON.stringify({
    email: email,
    password: password,
  });
        console.log('string',body)
        let res = await mappingService.put('/account/login',body)
        console.log("res", res)
        return res
    },
    async resetPassword(payload) {
        return await mappingService.put('/account/reset-password',payload)
    },
    async otpVerification(payload) {
        return await mappingService.put('/account/auth-login',payload)
    }
}