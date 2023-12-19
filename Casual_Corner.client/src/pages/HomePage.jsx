import React, { useState } from 'react'
import GamesComponent from '../components/GamesComponent.jsx'
import { AppState } from '../AppState.js'
import { gamesService } from '../services/GamesService.js'
import { mdiArrowUpCircle, mdiFilterOff } from '@mdi/js'
import Icon from '@mdi/react'
import Pop from '../utils/Pop.js'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const sortBy = ['name', 'released', 'added', 'created', 'updated', 'rating', 'metacritic']

  async function getGames(key = '', value) {
    try {
      setIsLoading(true)

      if (!key && !AppState.next) {
        return
      }

      if (key) {
        AppState.games = []
        AppState.params.page = 1
        AppState.params[key] = value
      }
      await gamesService.getGames()
    } catch (error) {
      Pop.error(error.message, '[GETTING GAMES]')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="home-page">
      <div className="container-fluid my-3">
        <div className="row">
          <div className="d-none d-md-block col-3 col-lg-2">
            <p className="fs-5 fw-bold pt-2">Genres</p>
            {AppState.genres.map((g) => {
              return (
                <div
                  onClick={() => getGames('genres', g.id)}
                  key={`genres${g.id}`}
                  className="d-flex align-items-center p-2 rounded selectable">
                  <img
                    className="me-2 rounded"
                    style={{
                      height: '30px',
                      width: '30px',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                    src={g.image}
                    alt={g.name}
                  />
                  <p>{g.name}</p>
                </div>
              )
            })}
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            <p className="p-2 fs-1 fw-bold">Games</p>
            <div className="d-flex align-items-center py-3">
              <div className="dropdown p-2">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <span className="pe-3">Sort By</span>
                </button>
                <ul className="dropdown-menu">
                  {sortBy.map((s, index) => (
                    <li
                      onClick={(e) => {
                        let value = e.target.innerText.toLowerCase()
                        const checkMetacritic =
                          value == 'metacritic' && AppState.params.ordering != '-' + value

                        if (AppState.params.ordering == value || checkMetacritic) {
                          value = '-' + value
                        }
                        getGames('ordering', value)
                      }}
                      key={`sort${index}`}
                      className="dropdown-item selectable">
                      <p className="text-capitalize">{s}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dropdown p-2">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <span className="pe-5">Platforms</span>
                </button>
                <ul className="dropdown-menu scrollable-auto max-vh-100">
                  {AppState.platforms.map((p) => (
                    <li
                      onClick={() => getGames('parent_platforms', p.id)}
                      key={`platform${p.id}`}
                      className="dropdown-item selectable">
                      {p.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="d-flex align-items-center selectable p-1 rounded"
                onClick={() => {
                  if (Object.keys(AppState.params).length == 1) {
                    return
                  }
                  AppState.games = []
                  AppState.params = { page: 1 }
                  getGames()
                }}>
                <Icon path={mdiFilterOff} size={0.75} color="red" className="me-2" />
                <p className="text-danger">Clear filters</p>
              </div>
            </div>
            <GamesComponent getGames={getGames} isLoading={isLoading} />
            <section className="row">{isLoading && <p>Loading...</p>}</section>
          </div>
        </div>
        <div className="position-fixed bottom-0 end-0">
          <Icon
            onClick={() => (document.documentElement.scrollTop = 0)}
            path={mdiArrowUpCircle}
            size={2.5}
            className="bg-light rounded-circle m-3 elevation-5 selectable"
          />
        </div>
      </div>
    </div>
  )
}
