import { api, gamesApi } from './AxiosService.js'
import { AppState } from '../AppState.js'
import { Game } from '../models/Game.js'

class GamesService {
  async getPlatforms() {
    const res = await gamesApi.get('api/platforms/lists/parents')
    AppState.platforms = res.data.results.map((d) => {
      return {
        id: d.id,
        name: d.name
      }
    })
  }

  async getGenres() {
    const res = await gamesApi.get('api/genres')
    AppState.genres = res.data.results.map((d) => {
      return {
        id: d.id,
        name: d.name,
        image: d.image_background
      }
    })
  }

  async getGames() {
    let url = 'api/games?page_size=24&'
    const params = Object.entries(AppState.params)
    params.forEach((p) => {
      url += `${p[0]}=${p[1]}&`
    })
    const res = await gamesApi.get(url)
    AppState.next = res.data.next
    const games = res.data.results.map((r) => new Game(r))
    AppState.games = AppState.games.concat(games)
  }

  async getGameById(gameId) {
    const res = await gamesApi.get(`api/games/${gameId}`)
    AppState.activeGame = res.data
  }

  async getGamesByCreatorId() {
    const res = await api.get('account/games')
    AppState.savedGames = res.data.map((d) => new Game(d))
  }

  async createGame(gameData) {
    gameData.apiId = gameData.id
    const res = await api.post('api/games', gameData)
    AppState.savedGames = [...AppState.savedGames, new Game(res.data)]
  }

  async removeGame(gameId) {
    const res = await api.delete(`api/games/${gameId}`)
    AppState.savedGames = AppState.savedGames.filter((s) => s.id != gameId)
    return new Game(res.data)
  }

  getColors(score) {
    if (score >= 75) {
      return { color: '#66CC33', backgroundColor: '#66CC3330' }
    } else if (score >= 50) {
      return { color: '#FFCC33', backgroundColor: '#FFCC3330' }
    } else {
      return { color: '#FF0000', backgroundColor: '#FF000030' }
    }
  }
}

export const gamesService = new GamesService()
