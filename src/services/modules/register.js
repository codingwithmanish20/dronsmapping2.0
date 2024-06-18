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
        let res = await mappingService.put('/account/login',body)
        return res
    },
    async otpVerification(payload) {
        return await mappingService.put('/account/auth-login',payload)
    },
    async sendResetPasswordOTPEmail(payload) {

        return await mappingService.put('/account/reset-password/otp',payload)
    },
    async resetPassword(payload) {
        return await mappingService.put('/account/reset-passsword',payload)
    },
    async logout() {
        return await mappingService.put('/account/logout')
    },
    async refreshAccessToken(accessToken) {
        const payload={
            access_token:accessToken
        }
        return await mappingService.put('/account/regenrate-access-token',payload)
    },

}