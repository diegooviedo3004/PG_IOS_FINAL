import axios from 'axios'
const baseUrl = 'https://94da-186-77-198-83.ngrok-free.app/api'

const loginServer = newObject => {
    const request = axios.post(`${baseUrl}/login/`, newObject)
    return request.then(response => response.data)
}
  
export { loginServer, baseUrl }