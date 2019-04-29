import Taro, { getCurrentPages } from "@tarojs/taro";
import Query from "@/utils/request";
import { ENV, ONLINE_HOST, QA_HOST } from "@/configs/index";
import { updateToken, getStorageToken, removeStorageToken } from "@/utils/token";
import Dayjs from 'dayjs';
import Tip from '@/utils/tips';

// 默认host
const API_HOST = ENV == "production" ? ONLINE_HOST : QA_HOST;
// 保存token的key
const TOKEN_KEY = "User-Token";

// // Query实例
const BASE_QUERY = new Query(API_HOST);
BASE_QUERY.setDefaultUrlConfig({
  host: API_HOST,
  pathPrefix: "uapi/v1/",
  model: "",
  path: "",
  pathPostfix: ""
});

// Request 拦截器
const requestCallback = function (request) {
  // console.warn("--request拦截器--: ", request);
  const currentHeaders = request.headers;
  const currentToken = currentHeaders[TOKEN_KEY];
  if (!currentToken) {
    const storageToken = getStorageToken(); // 获取storage中的 token
    if (storageToken) {
      BASE_QUERY.setHeader({ [TOKEN_KEY]: storageToken }); // 修改全局请求的 header
      request.headers[TOKEN_KEY] = storageToken; // 修改当前请求的 header
      return request;
    }
  }
};

// Response 拦截器:
const responseErrorCallbackDefault = function (response) {
  // console.warn("--- 响应拦截器 ---", response);
  let responseData = response.data;
  if (responseData.status) {
    return responseData;
  } else if (responseData.code >= 300 && responseData.code < 400) {
    // 300系错误
    Tip.modal("API-Error提示: code-300", JSON.stringify(responseData));
    console.error("API-Error提示: code-300", JSON.stringify(responseData));
  } else if (responseData.code >= 400 && responseData.code < 500) {
    // 400系错误
    if (responseData.code === 401) {
      // redux-action中进行登录操作
    } else {
      // 非 code=401 错误
      Tip.modal("API-Error提示: code-400", JSON.stringify(responseData));
      console.error("API-Error提示: code-400", JSON.stringify(responseData));
    }
  } else if (500 <= responseData.code && responseData.code < 600) {
    // 500系错误
    Tip.modal("API-Error提示: code-500", JSON.stringify(responseData));
    console.error("API-Error提示: code-500", JSON.stringify(responseData));
  } else if (responseData.code >= 600) {
    // 600系错误
  } else {
    Tip.modal("API-Error提示: code-600", JSON.stringify(responseData));
    console.error("API-Error提示: code-600", JSON.stringify(responseData));
  }
  return responseData; // 默认返回处理过的参数
};

// 设置api拦截器
BASE_QUERY.setRequestIntercepter(requestCallback);
BASE_QUERY.setResponseIntercepter(responseErrorCallbackDefault);

// export
export default BASE_QUERY;
