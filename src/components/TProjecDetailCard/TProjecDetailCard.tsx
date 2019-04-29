import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { TProjecDetailCardProps, TProjecDetailCardState } from './TProjecDetailCard.interface'
import './TProjecDetailCard.scss'
class TProjecDetailCard extends Component<TProjecDetailCardProps, TProjecDetailCardState> {
  constructor(props: TProjecDetailCardProps) {
    super(props)
    this.state = {}
  }

  static options = {
    addGlobalClass: true
  }
  static defaultProps: TProjecDetailCardProps = {
    posterUrl: '',
    projectName: '',
    projectType: '',
    incomeAmount: '',
    incomeCount: 0,
    userJob: '',
    onClick: () => { },
  }
  render() {
    const { posterUrl, projectName, projectType, incomeAmount, incomeCount, userJob, onClick } = this.props;
    return (
      <View className='fx-TProjecDetailCard-wrap' onClick={onClick}>
        {/* 项目海报 */}
        <View className="project-poster-wrap">
          <Image className="project-poster" src={posterUrl} />
        </View>
        {/*  项目信息 */}
        <View className="project-info-wrap">
          <View className="project-info-box">
            <Text className="project-name">{projectName}</Text>
            <Text className="project-type">{projectType}</Text>
          </View>
          <View className="project-info-extra-box">
            <View className="job-info">
              <Text className="user-job">岗位：{userJob}</Text>
            </View>
          </View>
        </View>
        {/*  项目信息 */}
        <View className="project-info-wrap">
          <View className="income-info-box">
            <Text className="income-count">累计{incomeCount}笔收款</Text>
          </View>
          <View className="project-info-extra-box">
            <View className="income-info-box">
              <Text className="income-count-amount">¥ {incomeAmount}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default TProjecDetailCard
