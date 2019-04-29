import userApi from "@/api/user";

export default {
  namespace: "user",
  state: {
    userInfo: {},
    logined: false
  },

  effects: {
    *updateUserInfo({ payload }, { select, call, put }) {
      try {
      } catch (err) {
        console.error(err);
      }
    }
  },

  reducers: {
    updateState(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
};
