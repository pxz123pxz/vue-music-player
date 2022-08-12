
const state = {
    //获取的音乐结果
    List: [],
};
const actions = {
    getMusicList(context,List){
        context.commit('GETMUSICLIST',List)
    }
};
const mutations = {
    GETMUSICLIST(state,List){
        state.List = List;
    }
};
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
}