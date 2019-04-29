import without from "lodash/without";
// import { request, reportAnalytics } from "@tarojs/taro";

// types
type identity = <T>(params: T) => T;
type intercepterRequestInput = (params: any) => boolean;
type intercepterResponseInput = {
  error: (data: any) => any; // 请求失败的错误处理（标准http失败）
  default: (data: any) => any; // 非定义状态码的错误处理
  [propName: number]: (data: any) => any; // 指定状态码的错误处理， @formate: { 300: hook() }
};

/**
 * 创建request拦截器
 * ** 使用例子 **
 * ```typescript
 *    const hock = (request)=>request;
 *    createRequestIntercepter(hock);
 * ```
 */
const createRequestIntercepter = function(
  hook: intercepterRequestInput
): identity {
  return function(request) {
    // console.info("--- request请求拦截器 ---");
    // console.info(request);
    hook(request);
    return request;
  };
};

/**
 * 创建response拦截器
 * ** 使用例子 **
 *   ```typescript
 *    const params = {
 *      401: (data: any) => any;
 *      error: (data: any) => any;
 *      default: (data: any) => any;
 *    }
 *    createResponseIntercepter(params);
 *    ``` 
 */
const createResponseIntercepter = function(params: intercepterResponseInput):any {
  return function(response: { data: any; status: number }) {
    // console.info("--- response返回拦截器 ---");
    // console.info(response);
    if (response.status >= 200 && response.status < 300) {
      // 标准http请求成功 200 <= httpCode < 300
      return params.default(response);
    } else {
      // 标准http请求失败 httpCode != [200...299]
      params.error(response);
      console.error("网络请求失败: ", response);
    }
    return response;
  };
};

/**
 * 查看number是否在指定范围内（包含边界值）
 * @params: ( startNumber:number, endnumber:number, targetNumber:number )
 * @return: boolean
 */
function hasIncludeNumber(
  startNumber: number,
  endNumber: number,
  targetNumber: number
): boolean {
  return targetNumber >= startNumber && targetNumber <= endNumber;
}

/**
 * response回调( 只在 createResponseIntercepter 中调用 )
 * @params: ( numbScope:[number,number],callbackMap:{ error: ()=>{}, [propName:number]: ()=>{} })
 * @return: void
 */
function responseCallback(
  responseData: any,
  callbackMap: intercepterResponseInput
): void {
  const httpCodeCallbackList = without(
    Object.keys(callbackMap).map(callbackKey => {
      if (hasIncludeNumber(200, 699, Number(callbackKey))) {
        return callbackMap[callbackKey];
      }
      return null;
    }),
    null,
    undefined,
    ""
  );
  // callback调用
  if (httpCodeCallbackList.length > 0) {
    httpCodeCallbackList.forEach(callbackItem => {
      callbackItem(responseData);
    });
  } else {
    // 非“状态码“的 error 回调
    callbackMap.default(responseData);
  }
  return;
}

// Export
export { createRequestIntercepter, createResponseIntercepter,hasIncludeNumber };
// Export default
export default {
  createRequestIntercepter,
  createResponseIntercepter
};
