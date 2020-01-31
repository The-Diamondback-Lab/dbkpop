import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div className='header-bg'>
                <div className='header-content'>
                    <div id="title-text">DBKPop</div>
                    <div id="subtitle-text">Student K-Pop Groups at UMD</div>
                </div>
            </div>
        );
    }
}
