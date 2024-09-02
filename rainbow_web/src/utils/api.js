import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: server,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 모든 요청에 `access token`을 헤더에 추가
api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 응답 인터셉터: 401 에러 발생 시 로그아웃 처리
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 리프레시 토큰으로 access token 갱신
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await api.post('/api/auth/refresh', { token: refreshToken });
          const { accessToken } = response.data;
          
          // 새로운 access token을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', accessToken);

          // 실패했던 요청을 새로운 토큰으로 다시 시도
          api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.log("Refresh token is invalid or expired. Logging out...");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // 로그인 페이지로 리다이렉트
      }
    }

    return Promise.reject(error);
  }
);

export default api;
