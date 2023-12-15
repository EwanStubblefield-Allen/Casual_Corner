import React from 'react'
import GamesComponent from '../components/GamesComponent.jsx'

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="container-fluid my-3">
        <div className="row">
          <div className="d-none d-md-block col-2"></div>
          <div className="col-md-10">
            <p className="fs-1 fw-bold">Games</p>
            <GamesComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
