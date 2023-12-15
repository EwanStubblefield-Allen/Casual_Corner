import { AppState } from '../AppState.js'
import { Game } from '../models/Game.js'
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

  async getGameById(gameId) {
    const res = await api.get(`api/games/${gameId}`)
    const game = new Game(res.data)
    return this.converter(game)
  }

  async getGamesByCreatorId() {
    const res = await api.get('account/games')
    AppState.savedGames = res.data.map((d) => {
      const game = new Game(d)
      return this.converter(game)
    })
  }

  async createGame(gameData) {
    gameData = this.converter(gameData)
    const res = await api.post('api/games', gameData)
    const game = new Game(res.data)
    AppState.savedGames = [...AppState.savedGames, this.converter(game)]
  }

  async removeGame(gameId) {
    const res = await api.delete(`api/games/${gameId}`)
    AppState.savedGames = AppState.savedGames.filter((s) => s.id != gameId)
    return new Game(res.data)
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
