import Cookies from 'js-cookie';

export const getAccessToken = () => {
    
  return Cookies.get('access_token');
};
export const getRefreshToken = () => {
    
  return Cookies.get('refresh_token');
};
