import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AppState } from '../AppState.js'
import { gamesService } from '../services/GamesService.js'
import { mdiHeartOutline } from '@mdi/js'
import Icon from '@mdi/react'
import Pop from '../utils/Pop.js'

let page = 1

function getColors(score) {
  if (score >= 75) {
    return { color: '#66CC33', backgroundColor: '#66CC3330' }
  } else if (score >= 50) {
    return { color: '#FFCC33', backgroundColor: '#FFCC3330' }
  } else {
    return { color: '#FF0000', backgroundColor: '#FF000030' }
  }
}

function GameCard() {
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

  const games = AppState.games.map((g) => {
    return (
      <div key={g.id} className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
        <div className="card bg-dark elevation-5 h-100">
          <img className="card-img vh-25" src={g.background_image} alt={g.name} />
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-end">
                {/* {g.platforms.map((p) => (
                <img
                  className="img-fluid"
                  key={p.platform.id}
                  src={p.platform.image_background}
                  alt={p.platform.name}
                />
              ))} */}
                <p className="px-1 rounded" style={getColors(g.metacritic)}>
                  {g.metacritic}
                </p>
              </div>
              <p className="card-title fw-bold">{g.name}</p>
            </div>
            <div>
              {AppState.account && (
                <button className="btn btn-dark px-2 py-1 d-flex align-items-center" type="button">
                  <Icon path={mdiHeartOutline} size={0.75} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <section className="row">{AppState.games.length ? games : ''}</section>
      <section className="row">{isLoading && <p>Loading...</p>}</section>
    </>
  )
}

export default observer(GameCard)
