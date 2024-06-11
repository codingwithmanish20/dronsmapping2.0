import axios from 'axios'

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
