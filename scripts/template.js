/**
 * pages页面快速生成脚本 
 * 用法：npm run tep `文件名`
 * author: jiemo
 * date: 2018.11.9 
 */

const fs = require('fs');

const dirName = process.argv[2];// 文件夹名称 
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}

//页面模板
const indexTep = `import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '@/utils/request'
// import Tips from '@/utils/tips'
import { ${capPirName}Props, ${capPirName}State } from './${dirName}.interface'
import './${dirName}.scss'
// import {} from '@/interfaces/index';// global interfaces
// import {} from '@/types/index';// global types

// components

// images

// @connect(({ ${dirName} }) => ({
//     ...${dirName},
// }))
class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  static options = {
    addGlobalClass: true
  }
  constructor(props: ${capPirName}Props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='fx-${dirName}-wrap'>
        ${dirName}页面
      </View>
    )
  }
}
export default ${capPirName}
`

// scss文件模版
const scssTep = `@import "../../assets/scss/variables";
.#{$prefix} {
  &-${dirName}-wrap {
    width: 100%;
    min-height: 100vh;
    background-color: $page-color;
    overflow: scroll;
  }
}
`

// config 接口地址配置模板
const configTep = `export default {
  test: '/wechat/perfect-info', //xxx接口
}
`
// 接口请求模板
const serviceTep = `import Request from '../../utils/request'
const apiRequest = new Request('${dirName}');

export const testApi = (data)=>{
  return apiRequest.query({})
}
`

//model模板

const modelTep = `// import Taro from '@tarojs/taro';
// import * as ${dirName}Api from './service';
export default {
  namespace: '${dirName}',
  state: {},
  effects: {
    *example({ payload:Page },{ select, call, put }){}
  },
  reducers: {
    updateState(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
}
`

// interface 模版
const interfaceTep = `//import {} from '@/interfaces/index';
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}
/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.tsx`, indexTep); //tsx
fs.writeFileSync(`${dirName}.scss`, scssTep); // scss
fs.writeFileSync('config.ts', configTep); // config
fs.writeFileSync('service.ts', serviceTep); // service
fs.writeFileSync('model.ts', modelTep); // model
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface

// exit script
process.exit(0);