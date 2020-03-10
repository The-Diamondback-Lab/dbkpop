/* eslint-disable react/prop-types */
import React from 'react'

export default class Podcast extends React.Component {
  render() {
    return (
      <iframe
        className='soundcloud-embed'
        src={this.props.src}
        title={Buffer.from(this.props.src).toString('base64')}
        scrolling='no'
        frameBorder='no'
        allow='autoplay'
      ></iframe>
    )
  }
}
