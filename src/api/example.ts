import BaseQuery from './baseQuery';
import { IdCardType } from '@/types/index';
const MODEL = 'users';

// 登录
export function login(code: string) {
  return BaseQuery.query({
    model: MODEL,
    method: "POST",
    path: "template",
    bodyPayload: {
      code
    }
  }).then((res: { status: boolean; data: { token } }) => {
    return res;
  });
}


// EXPORT
export default {
  login,
};
