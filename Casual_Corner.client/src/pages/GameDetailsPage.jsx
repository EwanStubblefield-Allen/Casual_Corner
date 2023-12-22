import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { gamesService } from '../services/GamesService.js'
import { AppState } from '../AppState.js'
import DOMPurify from 'dompurify'
import Pop from '../utils/Pop.js'
import '../assets/scss/pages/GameDetailsPage.scss'

function GamesPage() {
  const params = useParams()

  useEffect(() => {
    getGameById()
  }, [])

  async function getGameById() {
    try {
      await gamesService.getGameById(params.gameId)
    } catch (error) {
      Pop.error(error.message, '[GETTING GAMES BY ID]')
    }
  }

  return (
    <div className="GamesPage">
      {AppState.activeGame && (
        <section className="row my-3 px-3">
          <div
            className="col-12 elevation-5 img-bg"
            style={{
              backgroundImage: `url(${AppState.activeGame.background_image})`
            }}>
            <section className="row text-bg py-2">
              <div className="col-12 col-md-4">
                <img
                  className="img-fluid w-100 rounded"
                  src={AppState.activeGame.background_image}
                  alt={AppState.activeGame.name}
                />

                <p className="fw-bold fs-5 text-decoration-underline">Developers:</p>
                <div className="d-flex justify-content-around py-2">
                  {AppState.activeGame.developers.map((d) => (
                    <img
                      key={d.id}
                      className="img-fluid info-img mx-2"
                      src={d.image_background}
                      alt={d.name}
                      title={d.name}
                    />
                  ))}
                </div>

                <p className="fw-bold fs-5 text-decoration-underline">Publishers:</p>
                <div className="d-flex justify-content-around py-2">
                  {AppState.activeGame.publishers.map((p) => (
                    <img
                      key={p.id}
                      className="img-fluid info-img mx-2"
                      src={p.image_background}
                      alt={p.name}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>
              <div className="col-12 col-md-8 pt-2">
                <div className="d-flex align-items-center">
                  <p className="fw-bold fs-3">{AppState.activeGame.name}</p>
                  <p
                    className="mx-2 px-1 rounded"
                    style={gamesService.getColors(AppState.activeGame.metacritic)}>
                    {AppState.activeGame.metacritic}
                  </p>
                </div>
                <p className="fw-bold text-decoration-underline">
                  ESRB Rating: {AppState.activeGame.esrb_rating.name}
                </p>
                <div
                  className="pe-3 pb-2 text-break scrollable-y vh-25"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(AppState.activeGame.description)
                  }}></div>

                <div className="d-flex justify-content-around">
                  <div className="d-flex flex-column align-items-center">
                    <p className="fw-bold fs-5 text-decoration-underline">Platforms:</p>
                    <div className="d-flex py-2">
                      {AppState.activeGame.platforms.map((p) => (
                        <img
                          key={p.platform.id}
                          className="img-fluid info-img mx-2"
                          src={p.platform.image_background}
                          alt={p.platform.name}
                          title={p.platform.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    <p className="fw-bold fs-5 text-decoration-underline">Genres:</p>
                    <div className="d-flex py-2">
                      {AppState.activeGame.genres.map((g) => (
                        <img
                          key={g.id}
                          className="img-fluid info-img mx-2"
                          src={g.image_background}
                          alt={g.name}
                          title={g.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="col-12 bg-dark rounded my-2">
            <p className="fw-bold fs-5 text-decoration-underline p-2">Tags:</p>
            <div className="d-flex flex-wrap py-2">
              {AppState.activeGame.tags.map((t) => (
                <img
                  key={t.id}
                  className="img-fluid info-img m-2"
                  src={t.image_background}
                  alt={t.name}
                  title={t.name}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default observer(GamesPage)
