import { AppState } from '../AppState.js'
import { Game } from '../models/Game.js'
import { logger } from '../utils/Logger.js'
import { api, gamesApi } from './AxiosService.js'

const keys = ['platforms', 'genres']

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

    const games = res.data.results.map((r) => {
      const platforms = r.parent_platforms
      const length = platforms.length > r.genres.length ? platforms.length : r.genres.length

      for (let i = 0; i < length; i++) {
        if (i < platforms.length) {
          const platform = platforms[i].platform
          platforms[i] = platform.name
        }

        if (i < r.genres.length) {
          r.genres[i] = {
            id: r.genres[i].id,
            name: r.genres[i].name,
            image: r.genres[i].image_background
          }
        }
      }
      return new Game(r)
    })
    AppState.games = AppState.games.concat(games)
  }

  async createSavedGame(gameData) {
    gameData = this.converter(gameData)
    const res = await api.post('api/savedGames', gameData)
    AppState.savedGames.push(this.converter(new Game(res.data)))
    logger.log(AppState.savedGames)
  }

  converter(data) {
    for (let k in keys) {
      let d = data[keys[k]]

      if (d) {
        if (typeof d == 'object') {
          d = JSON.stringify(d)
        } else {
          d = JSON.parse(d)
        }
        data[keys[k]] = d
      }
    }
    return data
  }
}

export const gamesService = new GamesService()
