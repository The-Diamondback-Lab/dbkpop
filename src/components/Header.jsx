import React from 'react'

export default class Header extends React.Component {
  render () {
    const videoHtml = '<video autoplay playsinline muted loop class="header-video"><source src="videos/bg-video.mp4"></source></video>'

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
}
