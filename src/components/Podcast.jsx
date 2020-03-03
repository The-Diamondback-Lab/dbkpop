/* eslint-disable react/prop-types */
import React from 'react'

export default class Podcast extends React.Component {
  render() {
    return (
      <iframe
        width='100%'
        height='166px'
        src={this.props.src}
        title={Buffer.from(this.props.src).toString('base64')}
        scrolling='no'
        frameBorder='no'
        allow='autoplay'
      ></iframe>
    )
  }
}
