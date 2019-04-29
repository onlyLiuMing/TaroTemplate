/**
 * appAgreement.state 参数类型
 *
 * @export
 * @interface AppAgreementState
 */
export interface AppAgreementState {
  agreeDelayedCount:number;
}
/**
 * appAgreement.props 参数类型
 *
 * @export
 * @interface AppAgreementProps
 */
export interface AppAgreementProps {
  isOpened: boolean;
  delayed: number;
  onClick: any;
}
