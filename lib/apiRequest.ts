import axios from "axios"

const apiRequest = axios.create({
    baseURL: "https://applied-jobs-tracker.vercel.app/api",
    // baseURL: "http://localhost:3001/api",
    withCredentials: true
})

export default apiRequest