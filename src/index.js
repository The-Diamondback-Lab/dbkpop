import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import Spinner from './components/spinner';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

import './styles/main.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = { loaded: false, startFadeOut: false };
    }

    componentDidMount() {
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
                }, 750)
            });
        }, 500);
    }

    render() {
        return (
            <div id='Home'>
                <Spinner
                    loaded={this.state.loaded}
                    startFadeOut={this.state.startFadeOut} />
                <Helmet>
                    <title>Little Bus of Horrors</title>
                    <link rel='icon' href='favicon.ico' />
                </Helmet>

                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('app'));