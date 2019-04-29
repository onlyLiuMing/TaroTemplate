// import Taro from '@tarojs/taro';
// import * as indexApi from './service';
export default {
  namespace: 'index',
  state: {},
  effects: {
    *example({ payload:Page },{ select, call, put }){}
  },
  reducers: {
    updateState(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
}
