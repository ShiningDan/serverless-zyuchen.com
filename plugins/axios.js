import axios from 'axios'

axios.defaults.withCredentials=true;
const instance = axios.create({
  baseURL: process.env.baseUrl,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
})

instance.interceptors.response.use((response) => {
  const {status, data} = response
  if (status !== 200) {
    throw response
  }
  return data
})

export default instance
