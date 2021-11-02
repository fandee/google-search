import React from 'react'

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModal: false,
        }
    }

    render() {
        return (
            <div className="nav">
                <div className="box-1">
                    <div className="nav_gmail">
                        <a href="#">Gmail</a>
                    </div>
                    <div className="nav_images">
                        <a href="#">Images</a>
                    </div>
                </div>
                <div className="box-2">
                    <div className="apps" onClick={() => this.setState({isModal: !this.state.isModal})}>
                        <img src="/img/apps.png" width="16" height="16" alt="google apps" style={{opacity: '0.5'}}></img>
                    </div>
                    {this.state.isModal ? <Modal/> : ''}
                    <div className="profile">
                        <img src="/img/turtle.png" width="32" height="32" alt="profile"></img>
                    </div>
                </div>
            </div>
        );
    }
}


class Modal extends React.Component {
    render() {
        return (
            <div className="modal">
                <div className="modal_item">
                    <img src="/img/turtle.png" width="30" height="30"></img>
                    <p>Account</p>
                </div>
                <div className="modal_item">
                    <img src="/img/g.png" width="30" height="30"></img>
                    <p>Search</p>
                </div>
                <div className="modal_item">
                    <img src="/img/maps.png" width="30" height="30"></img>
                    <p>Maps</p>
                </div>
                <div className="modal_item">
                    <img src="/img/youtube.png" width="30" height="30"></img>
                    <p>Youtube</p>
                </div>
                <div className="modal_item">
                    <img src="/img/play.png" width="30" height="30"></img>
                    <p>Play</p>
                </div>
                <div className="modal_item">
                    <img src="/img/news.png" width="30" height="30"></img>
                    <p>News</p>
                </div>
                <div className="modal_item">
                    <img src="/img/gmail.png" width="30" height="30"></img>
                    <p>Gmail</p>
                </div>
                <div className="modal_item">
                    <img src="/img/meet.png" width="30" height="30"></img>
                    <p>Meet</p>
                </div>
                <div className="modal_item">
                    <img src="/img/chat.png" width="30" height="30"></img>
                    <p>Chat</p>
                </div>
                <div className="modal_item">
                    <img src="/img/contacts.png" width="30" height="30"></img>
                    <p>Contacts</p>
                </div>
                <div className="modal_item">
                    <img src="/img/drive.png" width="30" height="30"></img>
                    <p>Drive</p>
                </div>
                <div className="modal_item">
                    <img src="/img/calendar.png" width="30" height="30"></img>
                    <p>Calendar</p>
                </div>
                <div className="modal_item">
                    <img src="/img/translate.png" width="30" height="30"></img>
                    <p>Translate</p>
                </div>
                <div className="modal_item">
                    <img src="/img/photos.png" width="30" height="30"></img>
                    <p>Pbotos</p>
                </div>
                <div className="modal_item">
                    <img src="/img/duo.png" width="30" height="30"></img>
                    <p>Duo</p>
                </div>
                <div className="modal_item">
                    <img src="/img/docs.png" width="30" height="30"></img>
                    <p>Docs</p>
                </div>
                <div className="modal_item">
                    <img src="/img/sheets.png" width="30" height="30"></img>
                    <p>Sheets</p>
                </div>
                <div className="modal_item">
                    <img src="/img/slides.png" width="30" height="30"></img>
                    <p>Slides</p>
                </div>
            </div>
        );
    }
}


export default Navigation;