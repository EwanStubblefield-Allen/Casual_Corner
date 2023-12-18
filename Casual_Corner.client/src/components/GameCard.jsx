import React from 'react'
import { observer } from 'mobx-react-lite'
import { AppState } from '../AppState.js'
import { Game } from '../models/Game.js'
import { gamesService } from '../services/GamesService.js'
import { mdiHeart, mdiHeartOutline } from '@mdi/js'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import Pop from '../utils/Pop.js'

function getColors(score) {
  if (score >= 75) {
    return { color: '#66CC33', backgroundColor: '#66CC3330' }
  } else if (score >= 50) {
    return { color: '#FFCC33', backgroundColor: '#FFCC3330' }
  } else {
    return { color: '#FF0000', backgroundColor: '#FF000030' }
  }
}

function GameCard({ gameProp }) {
  let foundGame = AppState.savedGames.find((s) => s.name == gameProp.name)

  async function createGame() {
    try {
      await gamesService.createGame(gameProp)
      Pop.success(`${gameProp.name} was added to your saved games!`)
    } catch (error) {
      Pop.error(error.message, '[CREATING GAME]')
    }
  }

  async function removeGame() {
    try {
      const isSure = await Pop.confirm(
        `Are you sure you want to delete ${gameProp.name} from your saved games?`
      )

      if (!isSure) {
        return
      }
      const game = await gamesService.removeGame(foundGame.id)
      Pop.toast(`${game.name} was removed from your saved games!`)
    } catch (error) {
      Pop.error(error.message, '[DELETING GAME]')
    }
  }

  return (
    <div className="card bg-dark border-0 elevation-5 h-100">
      <img className="card-img vh-25" src={gameProp.background_image} alt={gameProp.name} />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-end">
            {/* {gameProp.platforms.map((p) => (
                <img
                  className="img-fluid"
                  key={p.platform.id}
                  src={p.platform.image_background}
                  alt={p.platform.name}
                />
              ))} */}
            <p className="px-1 rounded" style={getColors(gameProp.metacritic)}>
              {gameProp.metacritic}
            </p>
          </div>
          <p className="card-title fw-bold">{gameProp.name}</p>
        </div>
        <div>
          {AppState.account && foundGame ? (
            <button
              onClick={() => removeGame()}
              className="btn btn-dark px-2 py-1 d-flex align-items-center"
              type="button">
              <Icon path={mdiHeart} size={0.75} />
            </button>
          ) : (
            <button
              onClick={() => createGame()}
              className="btn btn-dark px-2 py-1 d-flex align-items-center"
              type="button">
              <Icon path={mdiHeartOutline} size={0.75} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

GameCard.propTypes = {
  gameProp: PropTypes.instanceOf(Game).isRequired
}

export default observer(GameCard)
