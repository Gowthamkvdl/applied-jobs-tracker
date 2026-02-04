import axios from "axios"

const apiRequest = axios.create({
    baseURL: "https://applied-jobs-tracker.vercel.app/api",
    withCredentials: true
})

export default apiRequest