import React from 'react'
import GameCard from '../components/GameCard.jsx'

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-12">
            <GameCard />
          </div>
        </div>
      </div>
    </div>
  )
}
