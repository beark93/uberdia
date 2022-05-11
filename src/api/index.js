import axios from "axios";

const d2rApi = axios.create({
    timeout: 120000,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    }
})

export default {
    async getUberList() {
        await d2rApi.get().then(response => {
            return response.data
        }).catch(error => {
            console.log(error)
            return []
        })
    }
}