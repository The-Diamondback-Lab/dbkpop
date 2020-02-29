import React from 'react';

export default class Header extends React.Component {
    render() {
        let sh = window.screen.height;

        let s = `<video autoplay muted loop class="header-video" style="height: ${sh}px"><source src="videos/bg-video.mp4"></source></video>`;

        return (
            <div className='header-bg'>
                <div dangerouslySetInnerHTML={{__html: s}}></div>
                <div className='header-content'>
                    <div id="title-text">Koreography</div>
                    <div id="subtitle-text">Student K-Pop Groups at UMD</div>
                </div>
            </div>
        );
    }
}
