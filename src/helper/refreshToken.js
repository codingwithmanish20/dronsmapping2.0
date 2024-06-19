import api from '../services'
import { getRefreshToken } from './cookies';

let refreshTokenInterval;

const refreshAccessToken=async()=>{
  try {
    const token=getRefreshToken()
    const res=await api.register.refreshAccessToken(token)
    startTokenRefreshInterval()
    
  } catch (error) {
    console.error('Error::while calling refreshAccessToken api')
    
  }

}

export const startTokenRefreshInterval = () => {
  // Clear any existing interval to avoid multiple intervals
     refreshAccessToken();
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
  }

  // Set the interval to refresh token every 25 minutes (1500 seconds)
  refreshTokenInterval = setInterval(() => {
  },25*60*1000); // 25 minutes * 60 seconds/minute * 1000 milliseconds/second
};

// Optionally, stop the interval when needed (e.g., on logout)
export const stopTokenRefreshInterval = () => {
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
  }
};
