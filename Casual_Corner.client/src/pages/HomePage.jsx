import React from 'react'
import GameCard from '../components/GameCard.jsx'

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="container-fluid my-3">
        <div className="row">
          <div className="d-none d-md-block col-2"></div>
          <div className="col-md-10">
            <p className="fs-1 fw-bold">Games</p>
            <GameCard />
          </div>
        </div>
      </div>
    </div>
  )
}
