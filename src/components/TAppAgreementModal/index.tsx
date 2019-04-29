import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AppAgreementProps, AppAgreementState } from './appAgreement.interface'
import './appAgreement.scss'
import { countTimeDown } from '@/utils/common';

import TModal from '@/components/TModal';
import TButton from '@/components/TButton';

class AppAgreement extends Component<AppAgreementProps, AppAgreementState> {
  constructor(props: AppAgreementProps) {
    super(props)
    this.state = {
      agreeDelayedCount: 0,
    }
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps: AppAgreementProps = {
    isOpened: false,
    delayed: 10,
    onClick: () => { },
  }

  componentDidMount() {
    this.initPrams();
  }

  /**
   * 初始化参数
   */
  initPrams() {
    const { delayed } = this.props
    this.setState({
      agreeDelayedCount: delayed,
    });
    countTimeDown(delayed, (nextCount: number) => {
        this.setState({
          agreeDelayedCount: nextCount,
        })
    });
  }

  render() {
    const { isOpened, onClick } = this.props;
    const { agreeDelayedCount } = this.state;
    return (
      <TModal title="服务协议" isOpened={isOpened}>
        <View className='fx-appAgreement-wrap'>
          <View className="section-box">众观影人社保服务，旨在为影视从业者提供安心和便捷的社保缴纳渠道，让忙碌在各地的业内人能享受社会福利（购车指标、购房指标、退休养老等）；</View>
          <View className="section-box">目前可缴纳城市有北京、广州、杭州、厦门等；</View>
          <View className="section-box">社保服务仅适用于18周岁至法定退休年龄之间人员；</View>
          <View className="section-box">- 本社保服务由社保服务商“好社保”提供，详情可电话咨询4006351451。</View>
          <View className="botton-box"><TButton circle disabled={!Boolean(agreeDelayedCount <= 0)} onClick={(...val) => { onClick(...val) }} >同意{agreeDelayedCount > 0 ? `( ${agreeDelayedCount}s )` : ''}</TButton></View>
        </View>
      </TModal>

    )
  }
}
export default AppAgreement
