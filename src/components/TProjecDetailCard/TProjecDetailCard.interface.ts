/**
 * TProjecDetailCard.state 参数类型
 *
 * @export
 * @interface TProjecDetailCardState
 */
export interface TProjecDetailCardState {}
/**
 * TProjecDetailCard.props 参数类型
 *
 * @export
 * @interface TProjecDetailCardProps
 */
export interface TProjecDetailCardProps {
  posterUrl: string;
  projectName: string;
  projectType: string;
  incomeAmount: string;
  incomeCount: number;
  userJob: string;
  onClick?:any;
}
