import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppState } from '../AppState.js'
import { gamesService } from '../services/GamesService.js'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import logo from '../assets/img/cw-logo.png'
import Login from './Login.jsx'
import Pop from '../utils/Pop.js'

export function Navbar() {
  const [search, setSearch] = useState()

  async function getGames(event) {
    try {
      event.preventDefault()
      AppState.games = []
      AppState.params.page = 1
      AppState.params.search = search
      await gamesService.getGames()
    } catch (error) {
      Pop.error(error.message, '[GETTING GAMES BY SEARCH]')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-bg px-3">
      <Link className="navbar-brand d-flex" to={''}>
        <div className="d-flex flex-column align-items-center">
          <img alt="logo" src={logo} height="45" className="bg-dark rounded" />
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav d-flex flex-row align-items-center w-100 py-2 py-lg-0">
          <li className="flex-grow-1 px-2">
            <form onSubmit={(e) => getGames(e)} className="flex-grow-1">
              <div className="input-group">
                <Icon
                  type="submit"
                  id="searchGames"
                  className="input-group-text bg-dark border-0 p-1"
                  path={mdiMagnify}
                  color="white"
                  size={1.55}
                />
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control bg-dark text-light border-0"
                  placeholder="Search games"
                  aria-label="Search games"
                  aria-describedby="searchGames"
                />
              </div>
            </form>
          </li>
          <li className="px-2">
            <div className="form-check form-switch m-0">
              <input
                onChange={(e) =>
                  document.body.setAttribute('data-theme', e.target.checked ? 'dark' : 'light')
                }
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="darkModeCheck"
              />
              <label className="form-check-label" htmlFor="darkModeCheck">
                Dark Mode
              </label>
            </div>
          </li>
        </ul>
        <Login />
      </div>
    </nav>
  )
}
