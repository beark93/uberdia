import { createStore } from 'vuex'
import axios from "axios";

const d2rApi = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://diablo2.io/dclone_api.php' : '',
    timeout: 120000,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": '*'
    }
})


const regions = [
    { value: "1", text: 'America' },
    { value: "2", text: 'Europe' },
    { value: "3", text: 'Asia' },
]

const difficultys = [
    { value: "1", text: 'HardCore' },
    { value: "2", text: 'SoftCore' },
]

const defaultUberData = [
    { progress: "0", region: "1", ladder: "1", hc: "1" },
    { progress: "0", region: "1", ladder: "1", hc: "2" },
    { progress: "0", region: "1", ladder: "2", hc: "1" },
    { progress: "0", region: "1", ladder: "2", hc: "2" },
    { progress: "0", region: "2", ladder: "1", hc: "1" },
    { progress: "0", region: "2", ladder: "1", hc: "2" },
    { progress: "0", region: "2", ladder: "2", hc: "1" },
    { progress: "0", region: "2", ladder: "2", hc: "2" },
    { progress: "0", region: "3", ladder: "1", hc: "1" },
    { progress: "0", region: "3", ladder: "1", hc: "2" },
    { progress: "0", region: "3", ladder: "2", hc: "1" },
    { progress: "0", region: "3", ladder: "2", hc: "2" },
]

export default createStore({
    state: {
        uberData: []
    },
    getters: {
        getUberList(state) {
            let UberList = defaultUberData
            if (state.uberData && state.uberData.length > 0) {
                UberList = state.uberData.sort(function(a, b) {
                    return parseInt(a.hc) - parseInt(b.hc)
                }).sort(function(a, b) {
                    return parseInt(a.ladder) - parseInt(b.ladder)
                }).sort(function(a, b) {
                    return parseInt(a.region) - parseInt(b.region)
                })
            }
            return UberList.map(uber => {
                uber.percentage = parseInt((parseInt(uber.progress) / 6 * 100).toFixed(2))
                uber.title = regions.filter(item => item.value === uber.region)[0].text + " : " + difficultys.filter(item => item.value === uber.hc)[0].text
                return uber
            })
        }
    },
    mutations: {
        SET_UBERDATA(state, data) {
            state.uberData = data
        },
        CLEAR_UBERDATA(state) {
            state.uberData = defaultUberData
        }
    },
    actions: {
        async callUberApi({ commit }) {
            try {
                const path = process.env.NODE_ENV === 'production' ? '' : '/proxy'
                const data = await d2rApi.get(path)
                commit('SET_UBERDATA', data.data)
            } catch (error) {
                alert(error)
            }
        },
        async clearUberList({ commit }) {
            commit('CLEAR_UBERDATA')
        }
    }
})