export const getUserdetails=()=>{
    const user=JSON.parse(localStorage.getItem('auth-user')) || null
    return user
}
export const isUserExist=()=>{
    const user=JSON.parse(localStorage.getItem('auth-user')) || null
    if(user){
        return true
    }
    return false

}
