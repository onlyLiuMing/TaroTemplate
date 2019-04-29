/**
 * TProjectInfoCard.state 参数类型
 *
 * @export
 * @interface TProjectInfoCardState
 */
export interface TProjectInfoCardState {}
/**
 * TProjectInfoCard.props 参数类型
 *
 * @export
 * @interface TProjectInfoCardProps
 */
export interface TProjectInfoCardProps {
  posterUrl: string;
  name: string;
  type: string;
  joinStatus: string;
  infoDate: string|null;
  batchRemark: string|null;
  paymentInfo: string|null;
  onClick?:any;
}
