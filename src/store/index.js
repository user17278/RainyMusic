// 创建vuex的核心store
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 准备action，用于响应组件中的动作
// const actions = {}
// 准备mutations，用于操作数据(state)
// const mutations = {}
// 准备state，用于存储数据
// const state = {}

Vue.use(Vuex)

// 创建并导出store
export default new Vuex.Store({
    state: {
        loginStatus: false,
        username: '',
        token: '',
        favSongArr: [],
        changeFavSongArr: false
    },
    mutations: {
        addToFavSongArr(state, arr) {
            state.favSongArr = []
            arr.forEach(item => {
                state.favSongArr.push(item.id)
            });
        },
    },
    actions: {
    },
    getters: {
    }
})


