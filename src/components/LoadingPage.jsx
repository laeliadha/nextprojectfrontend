import React from 'react'

const LoadingPage = () => {
  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-4">
                <progress class="progress is-small is-primary" max="100">15%</progress>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default LoadingPage