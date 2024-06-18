let refreshTokenInterval;

const startTokenRefreshInterval = () => {
  // Clear any existing interval to avoid multiple intervals
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
  }

  // Set the interval to refresh token every 25 minutes (1500 seconds)
  refreshTokenInterval = setInterval(() => {
    refreshAccessToken();
  }, 25 * 60 * 1000); // 25 minutes * 60 seconds/minute * 1000 milliseconds/second
};

// Optionally, stop the interval when needed (e.g., on logout)
const stopTokenRefreshInterval = () => {
  if (refreshTokenInterval) {
    clearInterval(refreshTokenInterval);
  }
};
