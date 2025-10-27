import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/axiosInstance";


export const AxiosInterceptorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      (err) => {
        const isProtectedRequest = err.config?.headers?.["X-Protected-Request"];

        // if (err.response?.status === 401 && !isProtectedRequest) {
        //   navigate("/signin");
        // }

        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [navigate]);

  return <>{children}</>;
};
