/**
 * 运行环境 
 */ 
export const ENV: "development" | "production" = process.env.NODE_ENV;

/** 
 * 线上环境
 * 为了方便测试，使用的是聚合数据免费接口
 * 网址：https://www.juhe.cn/
 */
export const ONLINE_HOST = ""

/** 
 * 测试环境
 */
export const QA_HOST = ""
// export const QA_HOST = "http://172.16.222.48"

/** 
 * 线上mock
 */
export const MOCKHOST = ''

/** 
 * 是否mock
 */
export const ISMOCK = false

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = ONLINE_HOST

/**
 * 全局的分享信息 不用每一个都去写
 */
export const SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
}