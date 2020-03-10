/* eslint-disable react/prop-types */
import React from 'react'

import spinnerPath from '../assets/spinner.jpg'

export default class Spinner extends React.Component {
  render() {
    const dontShow = this.props.loaded && !this.props.startFadeOut
    const wrapperClasses = ['spinner-wrapper']

    if (this.props.startFadeOut) {
      wrapperClasses.push('animated')
      wrapperClasses.push('fadeOut')
    }

    return (
      <div style={dontShow ? { display: 'none' } : {}}>
        <div className={wrapperClasses.join(' ')}>
          <div className="spinner-container">
            <center>
              <img className="spinner-image"
                src={spinnerPath}
                alt="A loading animation"
              />
              <div className="preload"> <span></span> <span></span> <span></span></div>
            </center>
          </div>
        </div>
      </div>
    )
  }
}
