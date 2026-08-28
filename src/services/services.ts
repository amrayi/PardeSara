import axios from "axios";

export const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Response Error:", error);
    return Promise.reject(error);
  }
);

interface RequestParams {
  endPoint: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}

interface DataRequestParams<T = unknown> {
  endPoint: string;
  data?: T;
  headers?: Record<string, string>;
}

export const getData = async <T = unknown>({
  endPoint,
  headers,
  params,
}: RequestParams): Promise<T> => {
  try {
    const response = await apiClient.get<T>(endPoint, { params, headers });
    return response.data;
  } catch (error) {
    console.error("error in getData", error);
    throw error;
  }
};

export const postData = async <T = unknown, D = unknown>({
  endPoint,
  data,
  headers,
}: DataRequestParams<D>): Promise<T> => {
  try {
    const response = await apiClient.post<T>(endPoint, data, { headers });
    return response.data;
  } catch (error) {
    console.error("error in postData", error);
    throw error;
  }
};

export const postImageData = async <T = unknown>({
  endPoint,
  data,
}: {
  endPoint: string;
  data: FormData;
}): Promise<T> => {
  try {
    const response = await apiClient.post<T>(endPoint, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("error in postImageData", error);
    throw error;
  }
};

export const putImageData = async <T = unknown>({
  endPoint,
  data,
}: {
  endPoint: string;
  data: FormData;
}): Promise<T> => {
  try {
    const response = await apiClient.put<T>(endPoint, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("error in putImageData", error);
    throw error;
  }
};

export const patchData = async <T = unknown, D = unknown>({
  endPoint,
  data,
  headers,
}: DataRequestParams<D>): Promise<T> => {
  try {
    const response = await apiClient.patch<T>(endPoint, data, { headers });
    return response.data;
  } catch (error) {
    console.error("error in patchData", error);
    throw error;
  }
};

export const putData = async <T = unknown, D = unknown>({
  endPoint,
  data,
}: DataRequestParams<D>): Promise<T> => {
  try {
    const response = await apiClient.put<T>(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("error in putData", error);
    throw error;
  }
};

export const deleteData = async <T = unknown, D = unknown>({
  endPoint,
  data,
  headers,
}: DataRequestParams<D>): Promise<T> => {
  try {
    const response = await apiClient.delete<T>(endPoint, { data, headers });
    return response.data;
  } catch (error) {
    console.error("error in deleteData", error);
    throw error;
  }
};