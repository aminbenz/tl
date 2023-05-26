import axios from "axios"

const api = axios.create({
  // baseURL: "/api/v1",
  baseURL: "http://localhost:3000/api/v1",
  headers: { Accept: "application/json" },
})

// api.defaults.headers.common["authorization"] = "AUTH_TOKEN"

export default api
