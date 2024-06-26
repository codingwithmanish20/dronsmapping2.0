import { mappingService } from "../http"

export const dashboardApi={
    async getallCategory(){
        return  await mappingService.get('/project/categories')
    },
    async addProject(formData){
        return  await mappingService.post('/project/add-project',formData)
    },
    async getAllProjectstList(){
        return  await mappingService.get('/project/my-projects')
    },
    async getProjectDetailsById(projectId,email){
        return  await mappingService.get(`/project/get-project-by-project-id/${projectId}/${email}`)
    },
    async getUserProfile(){
        return  await mappingService.get('/user/me')
    }
}