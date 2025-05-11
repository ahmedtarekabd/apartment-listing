import axios from 'axios'

// Configure axios defaults
console.log('NEXT_PUBLIC_BE_URL', process.env.NEXT_PUBLIC_BE_URL)
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:5000/api/v1'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle errors globally
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

export default axios
