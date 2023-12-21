export class Game {
  constructor(data) {
    this.id = data.id
    this.apiId = data.apiId
    this.name = data.name
    this.released = data.released
    this.background_image = data.background_image
    this.metacritic = data.metacritic
    this.creatorId = data.creatorId
    this.creator = data.creator
  }
}
