import { mappingService } from "../http"

export const dashboardApi={
    async getallCategory(){
        return  await mappingService.get('/project/categories')
    }
}