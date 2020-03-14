import React from 'react'

export default class Header extends React.Component {
  render() {
    const videoHtml = '<video id="bg-video" autoplay playsinline muted loop class="header-video"><source src="videos/bg-video.mp4"></source></video>'

    return (
      <div className='header-bg'>
        <div dangerouslySetInnerHTML={{ __html: videoHtml }}></div>
        <div className='header-content'>
          <div id="title-text">Koreography</div>
          <div id="subtitle-text">Student K-Pop Groups at UMD</div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const ua = navigator.userAgent.toLowerCase()
    const isSafari = ua.indexOf('safari/') >= 0 && ua.indexOf('chrome') < 0

    // Force autoplay on safari
    if (isSafari) {
      const video = document.getElementById('bg-video')

      // Only force play video if muted and has autoplay
      if (video instanceof HTMLMediaElement && video.muted && video.autoplay) {
        setTimeout(() => {
          video.play()
        }, 50)
      }
    }
  }
}
