import axios from "axios";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
});

// Interceptor REQUEST: tự động gắn header vào mọi request
api.interceptors.request.use((config) => {
  // Lấy user từ localStorage (nếu đã đăng nhập)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return {
    ...config,
    headers: {
      ...config.headers,
      // Token của trường — bắt buộc cho mọi API
      TokenCybersoft:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjA0LzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5NjM0MjQwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk2NDkwMDAwfQ.DcungLS2D0-V5FlObrYQNV283QRSfZfrw3c0RHFR02Q",
      // Token của user — chỉ có sau khi đăng nhập thành công
      Authorization: user?.accessToken ? `Bearer ${user.accessToken}` : undefined,
    },
  };
});

export default api;
