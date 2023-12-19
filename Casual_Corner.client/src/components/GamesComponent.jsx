import React, { useEffect, useState } from 'react'
import GameCard from './GameCard.jsx'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'
import { AppState } from '../AppState.js'
import { gamesService } from '../services/GamesService.js'
import Pop from '../utils/Pop.js'

function GamesComponent({ getGames, isLoading }) {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', (e) => setScrollTop(e.target.documentElement.scrollTop))
    getGames()
    getPlatforms()
    getGenres()
  }, [])

  useEffect(() => {
    if (
      !scrollTop ||
      scrollTop + document.documentElement.clientHeight <
        document.documentElement.scrollHeight - 100 ||
      isLoading
    ) {
      return
    }
    AppState.params.page++
    getGames()
  }, [scrollTop])

  async function getPlatforms() {
    try {
      await gamesService.getPlatforms()
    } catch (error) {
      Pop.error(error.message, '[GETTING PLATFORMS]')
    }
  }

  async function getGenres() {
    try {
      await gamesService.getGenres()
    } catch (error) {
      Pop.error(error.message, '[GETTING GENRES]')
    }
  }

  const games = AppState.games.map((g) => {
    if (!g.background_image) {
      return
    }
    return (
      <div key={g.id} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
        <GameCard gameProp={g} />
      </div>
    )
  })

  return <section className="row">{AppState.games.length ? games : ''}</section>
}

GamesComponent.propTypes = {
  getGames: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default observer(GamesComponent)
