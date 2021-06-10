import axios from "axios"

const getToken = () => {
  // token retrieval code goes here
  return ""
}

const api = axios.create({
  headers: {
    Authorization: getToken(),
  },
})

export default api
