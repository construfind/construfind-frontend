import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://construfind-api-d.azurewebsites.net/'
  //baseURL: 'https://construfind-api-h.azurewebsites.net/'
})
