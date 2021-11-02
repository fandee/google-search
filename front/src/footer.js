import React from 'react'
import './footer.css'

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: props.location
        }
    }

    componentWillReceiveProps(props) {
        this.setState({location: props.location})
    }

    render() {
        return (
            <div className="footer">
                <div className="location">{this.state.location}</div>
                <div className="copyright">
                    <div className="copyright-box">
                        <a href="https://about.google/">About</a>
                        <a href="https://ads.google.com/">Advertising</a>
                        <a href="https://www.google.com/">Business</a>
                        <a href="https://www.google.com/search/howsearchworks">How Search works</a>
                    </div>
                    <div className="copyright-box">
                        <a href="https://policies.google.com/privacy">Privacy</a>
                        <a href="https://policies.google.com/terms">Terms</a>
                        <a>Settings</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;