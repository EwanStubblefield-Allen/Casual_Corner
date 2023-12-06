import React from 'react'
import { gamesService } from '../services/GamesService.js'
import GameCard from '../components/GameCard.jsx'
import Pop from '../utils/Pop.js'

async function getGames(page = 1) {
  try {
    await gamesService.getGames('page_size=12', `page=${page}`)
  } catch (error) {
    Pop.error(error.message, '[GETTING GAMES]')
  }
}

export default function HomePage() {
  getGames()

  return (
    <div className="home-page">
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-12">
            <GameCard />
          </div>
        </div>
      </div>
    </div>
  )
}
