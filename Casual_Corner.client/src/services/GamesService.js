import { AppState } from '../AppState.js'
import { gamesApi } from './AxiosService.js'

class GamesService {
  async getGames(...options) {
    let url = 'api/games?'
    options.forEach((o, index) => {
      url += o

      if (options.length - 1 != index) {
        url += '&'
      }
    })
    const res = await gamesApi.get(url)
    AppState.games = AppState.games.concat(res.data.results)
  }
}

export const gamesService = new GamesService()
