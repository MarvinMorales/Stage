import React from 'react';
import './Main.css';
import top from '../images/TOP.jpg';
import bottom from '../images/BOTTOM.jpg';
import ReactHlsPlayer from 'react-hls-player';
import {ReactFlvPlayer} from 'react-flv-player'

const Main = () => {
    return (
        <div className="maindiv">
            <img src={top} id="top"/>
            <div className="container">
                <ReactFlvPlayer
                    url = "https://fb8b6869b6f6.ngrok.io/live/STREAM_NAME.flv"
                    heigh = "100%"
                    width = "100%"
                    isMuted={true}
                />
            </div>
            <img src={bottom} id="bottom"/>
        </div>

    );
}

export default Main;