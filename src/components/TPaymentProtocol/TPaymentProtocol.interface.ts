/**
 * TPaymentProtocol.state 参数类型
 *
 * @export
 * @interface TPaymentProtocolState
 */
export interface TPaymentProtocolState { }
/**
 * TPaymentProtocol.props 参数类型
 *
 * @export
 * @interface TPaymentProtocolProps
 */
export interface TPaymentProtocolProps {
  protocolInfoList: ProtocolInfo[];
}

/**
 * 协议信息
 */
export interface ProtocolInfo {
  firstPartyName: string; // 甲方公司
  secondPartyName: string; // 乙方公司
  contractName: string; // 合同名称
  date: {
    firstParty: {
      year: string|number;
      month: string|number;
      day: string|number;
    },
    secondParty: {
      year: string|number;
      month: string|number;
      day: string|number;
    }
  }, // 签署日期 
}
