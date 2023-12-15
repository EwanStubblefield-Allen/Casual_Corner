export class Game {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.released = data.released
    this.background_image = data.background_image
    this.metacritic = data.metacritic
    this.playtime = data.playtime
    this.platforms = data.parent_platforms || data.platforms
    this.genres = data.genres
    this.esrb_rating = data.esrb_rating?.name || data.esrb_rating
  }
}
