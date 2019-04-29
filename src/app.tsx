import Taro, { Component, Config, getCurrentPages } from "@tarojs/taro";
import "@tarojs/async-await";
import { Provider } from "@tarojs/redux";
import "@/configs/taroConfig";
import "@/utils/request";
import Index from "./pages/index";
import dva from "./utils/dva";
import models from "./models";
import "./app.scss";
import { globalData } from "./utils/common";
// import { WechatQrcodeParamsStruct } from '@/interfaces/index';
// import { autoGetScope, hasScope } from "@/utils/scope";
// import Tips from "./utils/tips";
import { ENV } from "./configs";

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();


class App extends Component {
  config: Config = {
    pages: [ ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "white",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#B9BBC4",
      selectedColor: "#9896FE",
      backgroundColor: "#fff",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/index",
          text: "项目",
          iconPath: "pages/index.png",
          selectedIconPath: "pages/index.png"
        }
      ]
    }
  };

  /**
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   * @memberof App
   */
  async componentDidMount() {
    // 获取设备信息
    const sys = await Taro.getSystemInfo();
    sys && (globalData.systemInfo = sys);

    // 实例化插件工具()
    this.initPlugin();
  }

  componentDidShow() {
    // 获取参数
    const referrerInfo = this.$router.params.referrerInfo;
    const query = this.$router.params.query;
    !globalData.extraData && (globalData.extraData = {});
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData;
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      };
    }
  }

  componentDidHide() { }

  componentDidCatchError() { }

  componentDidNotFound(...args) {
    console.error('not fond page: ', args);
  }

  /**
   * 实例化插件
   */
  initPlugin() {
    if (ENV != 'production') return;
    console.warn('--- 实例化plugin(production环境生效) ----');
    const initOptions = this.$router.params;
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index></Index>
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
