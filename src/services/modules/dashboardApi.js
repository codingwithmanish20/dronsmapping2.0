import { mappingService } from "../http"

export const dashboardApi={
    async getallCategory(){
        return  await mappingService.get('/project/categories')
    },
    async getAllProjectList(){
     return  await mappingService.get('/project/my-projects')
    },
    async getUserProfile(){
     return  await mappingService.get('/user/me')
    }
}