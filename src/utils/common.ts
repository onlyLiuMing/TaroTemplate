import CloneDeep from 'lodash/cloneDeep';

/** 获取url中参数 **/
function getUrlParams(url: string): object {
  let urlQueryString = url.split('?')[1];// url上附带的query参数
  let resultUrlParams = {}; // 返回的参数列表
  if (urlQueryString) {
    urlQueryString.split('&')
      .forEach(item => {
        let _data = item.split('=');
        resultUrlParams[_data[0]] = _data[1];
      });
  }
  return resultUrlParams;
}

/**
 * 解析扫码传入的url
 * @param url 
 */
function parseWechaQrCodeParmas(params: string): object {
  if (typeof params != 'string') {
    throw (`[parseWechaQrCodeParmas]: ${params} is not string`);
  }
  let _url = decodeURIComponent(params)
  let payload = {};
  // 将url上的query参数转为json
  _url
    .split('?')[1]
    .split('&')
    .forEach(item => {
      let _data = item.split('=');
      payload[_data[0]] = _data[1];
    });
  return payload;
}

/**
 * 递归清理object参数（保留key及类型）
 * @param obj 
 */
function clearObjectValue<InputObject>(inputObject: InputObject): InputObject {
  if (!inputObject) {
    throw (`${inputObject} is not object`)
  }
  let _obj = CloneDeep(inputObject);
  Object.keys(_obj).forEach(key => {
    if (!!_obj[key] && typeof _obj[key] === "object") {
      if (Array.isArray(_obj[key])) {
        // array类型
        _obj[key] = [];
      } else {
        // object类型
        _obj[key] = this._clearObjectParams(_obj[key]);
      }
    } else {
      // string,number 等变量类型
      _obj[key] = undefined;
    }
  });
  return _obj;
}

/**
 * CountTimeDown (倒计时)
 * @use: 
 *  const countTimeDown = new CountTimeDown(10,(nextCount)=>{ console.log(nextCount) });
 *  countTimeDown.start();
 *  countTimeDown.stop();
 *  countTimeDown.init();
 */
class CountTimeDown{
  public INTERVAL:number = 1000;// 间隔
  public CALLBACK:(nextCount:number)=>any;// 回调函数
  public COUNT:number;
  public INITIAL_COUNT:number;
  public ALLOW_NEXT:boolean= true;
  public TIMER:any=undefined;
  constructor(count:number,callback:(nextCount:number)=>any,interval?:number){
    this.INTERVAL = interval?interval:1000;
    this.COUNT = count;
    this.INITIAL_COUNT = count;
    this.CALLBACK = callback; 
  }

  // 计时器
  _startCount() {
    const nextDelayed = this.COUNT - 1;
    const hasNext: boolean = Boolean(nextDelayed > -1)&&this.ALLOW_NEXT;
    this.COUNT= nextDelayed;
    if (hasNext) {
      this.TIMER = setTimeout(() => {
        this.CALLBACK(nextDelayed);
        this._startCount();
      }, this.INTERVAL);
    }
  }

  // 停止
  stop(){
    this.ALLOW_NEXT = false;
  }

  // 开始
  start(){
    this.ALLOW_NEXT = true;
    this._startCount();
  }

  // 初始化
  init(){
    this.stop();
    clearTimeout(this.TIMER);
    this.TIMER = undefined;
    this.COUNT = this.INITIAL_COUNT;
  }

}


var globalData: any = {}; // 全局公共变量

// export
export {
  formatTime,
  getUrlParams,
  globalData,
  parseWechaQrCodeParmas,
  clearObjectValue,
  countTimeDown,
  CountTimeDown,
}

// export default
export default {
  formatTime,
  getUrlParams,
  globalData,
  parseWechaQrCodeParmas,
  clearObjectValue,
  countTimeDown,
  CountTimeDown
}