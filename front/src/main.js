import React from 'react'
import './main.css'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: false,
            clearOption: false,
            searches: [],
            input: '',
            searchBoxFocus: false,
            isListening: false,
        }
    }


    handleInput(val) {
        val ? this.setState({clearOption: true, input: val}) : this.setState({clearOption: false, input: ''})
        setTimeout(() => {
            document.getElementsByClassName('input')[0].focus();
        }, 100)
    }

    clearInput() {
        this.setState({clearOption: false, input: ''})
        this.getSearches()
        setTimeout(() => {
            document.getElementsByClassName('input')[0].focus();
        }, 100)
    }

    search(search_query) {
        console.log('Searching "' + search_query + '"')
        const data = {search_query: search_query}
        fetch('http://localhost:5000/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                this.getSearches(search_query)
                console.log(json)
            })
    }

    removeSearch(search) {
        let searches = this.state.searches
        this.setState({searches: searches.filter(s => s !== search)})
        const data = {search_query: search.title}
        fetch('http://localhost:5000/remove', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            this.getSearches(this.state.input)
            console.log(json)
        })
        setTimeout(() => {
            document.getElementsByClassName('input')[0].focus();
        }, 100)
    }

    getSearches(search_query='') {
        const data = {search_query: search_query}
        fetch('http://localhost:5000/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            this.setState({searches: json.data})
            console.log(json)
        })
    }

    voiceInput() {
        if (this.state.isListening) {
            document.getElementsByClassName('microphone')[0].classList.remove('listening')
            this.setState({isListening: false})
            SpeechRecognition.stopListening()
        } else {
            document.getElementsByClassName('microphone')[0].classList.add('listening')
            this.setState({isListening: true})
            SpeechRecognition.startListening({
                continuous: true
            })
        }
    }

    render() {
        const searches = this.state.searches.map((s, idx) => {
            return (
                <div 
                    className={s.is_searched ? 'search-item searched' : 'search-item'} 
                    key={idx} 
                    tabIndex="0"
                    onClick={() => {
                        this.handleInput(s.title)
                        this.search(s.title)
                    }} 
                    >
                    {s.title}
                    {s.is_searched ? 
                        <button className="dlSearch" tabIndex="-1" onClick={(e) => {
                            e.stopPropagation()
                            this.removeSearch(s)
                        }}>&times;</button>
                        : <button className="fnSearch" tabIndex="-1">
                            &#8599;
                        </button>
                    }
                </div>
            );
        })

        const features = (
            <div className="features">
                <a>Google Search</a>
                <a href="https://www.google.com/doodles">I'm feeling lucky</a>
            </div>
        )

        return (
            <div className="main">
                <div className="img">
                    <img src="/img/google.png" alt="google" />
                </div>
                <div 
                    className="search-box" 
                    onMouseLeave={() => {
                        document.getElementsByClassName('input')[0].blur();
                        this.setState({searchBoxFocus: false})
                    }}
                >
                    <input 
                        className="input" 
                        type="text" 
                        value={this.state.input}
                        onChange={(e) => {
                            this.handleInput(e.target.value)
                            this.getSearches(e.target.value)
                        }}
                        onKeyUp={(e) => e.keyCode === 13 ? this.search(e.target.value) : ''}
                        onFocus={(e) => {
                            this.setState({searchBoxFocus: true})
                            this.getSearches(e.target.value)
                        }}
                    />
                    <div 
                        className="microphone"
                        onClick={(e) => {
                            e.stopPropagation();
                            this.voiceInput();
                        }}></div>
                    {
                        this.state.clearOption ?
                        <button className="clearBtn" onClick={() => this.clearInput()}>&times;</button> :
                        ''
                    }
                    {
                        this.state.searchBoxFocus ?
                            <div className="dropbox">
                                {
                                    searches.length ? searches :
                                    'no suggestions'
                                }
                                {features}
                            </div> 
                        : ''
                    }
                </div>
                {
                    !this.state.searchBoxFocus ?
                    features :
                    ''
                }
            </div>
        );
    }
}

export default Main;