import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './nav.js';
import Main from './main.js'
import Footer from './footer.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => {
            fetch('https://api.opencagedata.com/geocode/v1/json?q=' 
            + pos.coords.latitude + '+' + pos.coords.longitude + 
            '&key=d3fcafceafd6414eba849ac7bb179c21')
                .then(response => response.json())
                .then(json => {
                    this.setState({ location: (json.results[0].components.continent + ', ' + json.results[0].components.country)})
                })
        })
        
    }

    render() {
        return <div className="page">
            <Navigation></Navigation>
            <Main></Main>
            <Footer location={this.state.location}></Footer>
        </div>
    }
}

ReactDOM.render(<App></App>, document.getElementById('root'))