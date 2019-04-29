import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { TBankCardProps, TBankCardState } from './TBankCard.interface'
import isEqual from 'lodash/isEqual';
import './TBankCard.scss'
class TBankCard extends Component<TBankCardProps, TBankCardState> {
  constructor(props: TBankCardProps) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps: TBankCardProps = {
    bankCardName: '',
    bankCardNumber: '',
    extraText: '',
    hasExtra: false,
    isActive: false,
  }

  /**
 * 隐藏银行卡信息
 * @param number:string
 */
  hideBankNumb(number: string): string {
    let numb = number.trim();
    let length = numb.length;
    let title = '';
    let _count = 0;
    for (let i = 0; i < length - 4; i++) {
      if (_count >= 4) {
        title += ' *';
        _count = 0;
        continue;
      }
      title += '*';
      _count++;
    }
    title += ' ' + numb.slice(-4);
    return title;
  }

  render() {
    const { bankCardName, bankCardNumber, isActive, hasExtra, extraText, onClick, onExtra } = this.props;
    const extraDecorateClass = isActive ? 'active' : '';
    return (
      <View className='fx-TBankCard-wrap' onClick={onClick}>
        <Text className="bank-name">{bankCardName}</Text>
        <Text className="bank-number">{this.hideBankNumb(bankCardNumber)}</Text>
        {
          hasExtra && <View className="extra">
            <View className="set-default" onClick={onExtra}>
              <View className={"set-decorate" + " " + extraDecorateClass}><View className="set-decorate-content" /></View>
              <Text className="set-default-title" >{extraText}</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}
export default TBankCard
