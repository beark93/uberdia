import { createStore } from 'vuex'
import axios from "axios";

const d2rApi = axios.create({
    baseURL: process.env.VUE_UBER_API_BASE_URL,
    timeout: 120000,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    }
})

const regions = [
    { value: "1", text: 'America' },
    { value: "2", text: 'Europe' },
    { value: "3", text: 'Asia' },
]
const ladders = [
    { value: "1", text: 'Ladder' },
    { value: "2", text: 'Non-Ladder' },
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
                    return Number(a.hc) - Number(b.hc)
                }).sort(function(a, b) {
                    return Number(a.ladder) - Number(b.ladder)
                }).sort(function(a, b) {
                    return Number(a.region) - Number(b.region)
                })
            }
            return UberList.map(uber => {
                uber.percentage = Number((Number(uber.progress) / 6 * 100).toFixed(2))
                uber.title = `${ladders.filter(item => item.value === uber.ladder)[0].text} - ${regions.filter(item => item.value === uber.region)[0].text} : ${difficultys.filter(item => item.value === uber.hc)[0].text}`
                return uber
            })
        }
    },
    mutations: {
        SET_UBERDATA(state, data) {
            state.uberData = data
        }
    },
    actions: {
        async callUberApi({ commit }) {
            try {
                const path = process.env.NODE_ENV === 'production' ? '' : '/api'
                const data = await d2rApi.get(path)
                commit('SET_UBERDATA', data.data)
            } catch (error) {
                alert(error)
            }
        }
    }
})