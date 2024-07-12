import axios from "axios"

export const baseURL = "http://10.0.2.2:8000"
// export const baseURL = "https://85f2-1-53-235-11.ngrok-free.app/"
// 10.0.2.2

const client = axios.create({ baseURL })

export default client
