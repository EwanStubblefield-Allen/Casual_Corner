import Axios from 'axios'
import { baseURL } from '../env'

export const api = Axios.create({
  baseURL,
  timeout: 8000
})
export const gamesApi = Axios.create({
  baseURL: 'https://api.rawg.io/',
  params: { key: 'a4ffe78da63b4dfd872cbbe53045bc04' },
  timeout: 8000
})

api.defaults.headers.authorization = JSON.parse(
  localStorage.getItem('user-token')
)
