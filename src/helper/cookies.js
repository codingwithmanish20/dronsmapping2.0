import Cookies from 'js-cookie';

export const getAccessToken = () => {
    
  return Cookies.get('access_token');
};
export const getRefreshToken = () => {
    
  const token =localStorage.getItem('refresh_token')
  return  token
};
