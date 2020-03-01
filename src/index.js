import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'

import Spinner from './components/Spinner'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

import './styles/main.css'

class Home extends React.Component {
  constructor () {
    super()
    this.state = { loaded: false, startFadeOut: false }
  }

  componentDidMount () {
    // After main component finishes mounting, wait 500ms
    // and change "loaded" to true and "startFadeOut" to true.
    // This will cause the spinner to start fading out.
    // This setState will call another timeout (750ms later)
    // to change the loaded to true and fade out to false,
    // indicating to the spinner that it should not display

    setTimeout(() => {
      // Indicating spinner to start fading out
      this.setState({
        loaded: true,
        startFadeOut: true
      }, () => {
        // Eventually tell spinner to never display
        setTimeout(() => {
          this.setState({
            loaded: true,
            startFadeOut: false
          })
        }, 1000)
      })
    }, 1000)
  }

  render () {
    return (
      <div id='Home' style={{ backgroundColor: 'rgb(25,25,25)' }}>
        <Spinner
          loaded={this.state.loaded}
          startFadeOut={this.state.startFadeOut} />
        <Helmet>
          <title>Koreography</title>
          <link rel='icon' href='favicon.ico' />
        </Helmet>

        <Header />
        <Content />
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<Home />, document.getElementById('app'))
