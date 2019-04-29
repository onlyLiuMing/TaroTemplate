import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import Api from '@/utils/request'
// import Tips from '@/utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
// import {} from '@/interfaces/index';// global interfaces
// import {} from '@/types/index';// global types

// components

// images

// @connect(({ index }) => ({
//     ...index,
// }))
class Index extends Component<IndexProps,IndexState > {
  config:Config = {
    navigationBarTitleText: '标题'
  }
  static options = {
    addGlobalClass: true
  }
  constructor(props: IndexProps) {
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
      <View className='fx-index-wrap'>
        index页面
      </View>
    )
  }
}
export default Index
