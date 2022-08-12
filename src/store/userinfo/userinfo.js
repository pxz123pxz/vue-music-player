import { reqGetMusicInfo } from "@/api/index";
const state = {
  accountInfo: {},
  playList: [],
  likeMusicList: [],
};
const actions = {
  getUserInfo({ commit }, data) {
    commit("GETUSERINFO", data);
  },
  getPlayList({ commit }, data) {
    commit("GETPLAYLIST", data);
  },
  async getLikeMusicIds({ commit }, data) {
    // 根据歌曲id，获取歌曲详情
    let newList = [];
    for (let i = 0; i < data.length; i++) {
      let res = await reqGetMusicInfo(data[i]);
      newList.push(res.songs[0]);
    }
    console.log("喜欢的音乐列表", newList);
    commit("GETLIKEMUSICLIST", newList);
  },
};
const mutations = {
  GETUSERINFO(state, data) {
    state.accountInfo = data;
  },
  GETPLAYLIST(state, data) {
    state.playList = data;
  },
  GETLIKEMUSICLIST(state, data) {
    state.likeMusicList = data;
  },
};
const getters = {
  Profile(state) {
    return state.accountInfo.profile || {};
  },
  LikeList(state) {
    return state.playList[0] || {};
  },
  CollectList(state) {
    return state.playList[1] || {};
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
