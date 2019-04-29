/**
 * TBankCard.state 参数类型
 *
 * @export
 * @interface TBankCardState
 */
export interface TBankCardState {}
/**
 * TBankCard.props 参数类型
 *
 * @export
 * @interface TBankCardProps
 */
export interface TBankCardProps {
  bankCardName: string;
  bankCardNumber: string;
  hasExtra: boolean,
  extraText:string;
  isActive: boolean;
  onClick?(any):any;
  onExtra?(any):any;
}
