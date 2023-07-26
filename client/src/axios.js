import axios from "axios"

export default axios.create({
    baseURL:process.env.REACT_PUBLIC_BACKEND_URL,
})


