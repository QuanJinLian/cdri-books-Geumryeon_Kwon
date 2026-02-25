import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
const KAKAO_KEY = import.meta.env.VITE_KAKAO_API_KEY;

function reqSuccess(config: InternalAxiosRequestConfig) {
  config.baseURL = "https://dapi.kakao.com";

  if (KAKAO_KEY) config.headers.setAuthorization("KakaoAK " + KAKAO_KEY);
  return config;
}

function resSuccess(response: AxiosResponse) {
  return response;
}

function resError(err: AxiosError) {
  // 401 403와 같은 에러 통일 처리

  return Promise.reject(err);
}

axios.interceptors.request.use(reqSuccess);
axios.interceptors.response.use(resSuccess, resError);
