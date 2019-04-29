import Taro, { Component } from '@tarojs/taro'
import { View,Text, Image} from '@tarojs/components'
import { TProjectInfoCardProps, TProjectInfoCardState } from './TProjectInfoCard.interface'
import './TProjectInfoCard.scss'

// images
import imgBell from './images/bell.png';

import { string } from 'prop-types';
class TProjectInfoCard extends Component<TProjectInfoCardProps,TProjectInfoCardState > {
  constructor(props: TProjectInfoCardProps) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps:TProjectInfoCardProps = {
    posterUrl: '',
    name: '',
    type: '',
    joinStatus: '',
    infoDate: '',
    batchRemark: '',
    paymentInfo: '',
    onClick: ()=>{},
  }
  render() {
    const { posterUrl,name,type,joinStatus,infoDate,batchRemark,paymentInfo,onClick } = this.props;
    const isShowExtraInfo = infoDate&&batchRemark&&paymentInfo;
    return (
      <View className='fx-TProjectInfoCard-wrap' onClick={onClick}>
        {/* 项目海报 */}
        <View className="project-poster-wrap">
          <Image className="project-poster" src={ posterUrl } />
        </View>
        {/*  项目信息 */}
        <View className="project-info-wrap">
          <View className="project-info-box">
            <Text className="project-name">{name}</Text>
            <Text className="project-type">{type}</Text>
            <Text className="project-join-status">{joinStatus}</Text>
          </View>
          <View className="project-info-extra-box">
            {
              isShowExtraInfo&&(<View className="last-info">
              <Image className='bell' src={imgBell}/>
              <Text className="date">[{infoDate}]:</Text>
              <Text className="batch-remark">{batchRemark}</Text>
              <Text className="payment-info">收款{paymentInfo}元</Text>
            </View>)
            }
          </View>
        </View>
      </View>
    )
  }
}
export default TProjectInfoCard
