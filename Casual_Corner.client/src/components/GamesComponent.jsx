import React, { useEffect, useState } from 'react'
import GameCard from './GameCard.jsx'
import { observer } from 'mobx-react-lite'
import { AppState } from '../AppState.js'
import { gamesService } from '../services/GamesService.js'
import Pop from '../utils/Pop.js'

let page = 1

function GamesComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', (e) => setScrollTop(e.target.documentElement.scrollTop))
    getGames()
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
    page++
    getGames()
  }, [scrollTop])

  async function getGames() {
    try {
      setIsLoading(true)
      await gamesService.getGames('page_size=12', `page=${page}`)
    } catch (error) {
      Pop.error(error.message, '[GETTING GAMES]')
    } finally {
      setIsLoading(false)
    }
  }

  const games = AppState.games.map((g) => (
    <div key={g.id} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
      <GameCard gameProp={g} />
    </div>
  ))

  return (
    <>
      <section className="row">{AppState.games.length ? games : ''}</section>
      <section className="row">{isLoading && <p>Loading...</p>}</section>
    </>
  )
}

export default observer(GamesComponent)
