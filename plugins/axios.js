import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.baseUrl
})

instance.interceptors.response.use((response) => {
  const {status, data} = response
  if (status !== 200) {
    throw response
  }
  return data
})

export default instance
