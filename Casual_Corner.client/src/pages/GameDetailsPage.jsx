import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { gamesService } from '../services/GamesService.js'
import Pop from '../utils/Pop.js'

function GamesPage() {
  const params = useParams()
  useEffect(() => {
    getGameById()
  })

  async function getGameById() {
    try {
      await gamesService.getGameById(params.gameId)
    } catch (error) {
      Pop.error(error.message, '[GETTING GAMES BY ID]')
    }
  }

  return <div className="GamesPage"></div>
}

export default observer(GamesPage)
