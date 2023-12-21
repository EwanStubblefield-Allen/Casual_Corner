import { observer } from 'mobx-react'
import React from 'react'
import { AppState } from '../AppState.js'
import '../assets/scss/pages/AccountPage.scss'
import GameCard from '../components/GameCard.jsx'
import Icon from '@mdi/react'
import { mdiPencil } from '@mdi/js'

function AccountPage() {
  return (
    <div className="account-page">
      <div className="container-fluid">
        <section className="row">
          <div className="col-12 col-md-12 p-0 position-relative">
            <img
              className="img-fluid cover-image"
              src={AppState.account.coverImg}
              alt={`${AppState.account.name} CoverImg`}
            />

            <div className="d-md-flex justify-content-between align-items-end position">
              <img
                className="account-picture"
                src={AppState.account.picture}
                alt={AppState.account.name}
              />
            </div>
          </div>
        </section>

        <section className="row justify-content-between align-items-start">
          <div className="offset-md-2 col-10 col-md-8 order-2 order-md-1 d-flex justify-content-md-center align-items-center pt-3">
            <div className="fs-1 fw-bold text-center text-break text-uppercase">
              {AppState.account.name}
            </div>
          </div>

          {AppState.account ? (
            <div className="col-12 col-md-2 order-1 order-md-2 d-flex justify-content-end p-2">
              <button
                className="btn btn-lg d-flex align-items-center fs-3"
                data-bs-toggle="modal"
                data-bs-target="#accountForm"
                title="Edit Account">
                <Icon path={mdiPencil} size={0.75} />
              </button>
            </div>
          ) : (
            <div className="col-12 col-md-2 order-1 order-md-2 text-end py-4"></div>
          )}
        </section>

        <section>
          {AppState.savedGames.map((g) => {
            return <GameCard key={g.id} gameProp={g} />
          })}
        </section>
      </div>
    </div>
  )
}

export default observer(AccountPage)
