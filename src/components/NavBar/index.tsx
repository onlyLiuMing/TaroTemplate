import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";

import "./index.scss";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type TabList = {
  title: string;
  current?: number;
};

type PageStateProps = {
};

type PageDispatchProps = {
};

type PageOwnProps = {
  current: number,
  tabList: TabList[],
  onPageChange: (index:number)=> void,
};

type PageState = {
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface NavBar {
  props: IProps;
  state: PageState;
}

class NavBar extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {};

  static defaultProps={
    current: 0,
    tabList: [],
  }

  componentWillMount(){}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  componentWillUpdate(){
  }

  componentDidShow() {}

  componentDidHide() {}

  handleClick(value: number): void {
    this.props.onPageChange(value)
  }

  render() {
    const { current,tabList } = this.props;
    return (
      <View className="nav_bar">
        {(tabList).map((item, index) => {
          return (
            <View
              className={classNames("nav_bar_tag_item", {
                nav_bar_tag_item_active: current === index
              })}
              key={index}
              onClick={this.handleClick.bind(this, index)}
            >
              <Text className="nav_Bar_tar_item_icon icon--camera" />
              <Text className="nav_Bar_tar_item_title">
                {(item as TabList).title}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default NavBar as ComponentClass<PageOwnProps, PageState> | any;
