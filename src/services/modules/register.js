import { mappingService } from "../http"

export const register = {
    async signup({email,password}) {
        return await mappingService.post('/account/signup',{email,password})
    }
}