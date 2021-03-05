import React, {useEffect, useState} from 'react';
import './Main.css';
import top from '../images/TOP1.jpg';
import bottom from '../images/BOTTOM1.jpg';
import loadingV from '../images/loading.gif';
import ReactHlsPlayer from 'react-hls-player';
import { useParams } from "react-router-dom";
import {ReactFlvPlayer} from 'react-flv-player';

const Main = () => {
    let { ticket } = useParams();
    const [url, setUrl] = useState("");
    const [userAgent, setUserAgent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var ba = ['Chrome', 'Firefox', 'Safari', 'Opera', 'MSIE'];
        var b, ua = navigator.userAgent;
        for (var i = 0; i < ba.length; i++) {
            if (ua.indexOf(ba[i]) > -1) { b = ba[i]; break; }
        } setUserAgent(b);

        const ws = new WebSocket('wss://31af2645a47f.ngrok.io');
            ws.onopen = (event) => {
            ws.send(JSON.stringify({type: "NEW_CLIENT", key: ticket, browser: b}));
        }

        ws.onmessage = (event) => {
            let _msg = JSON.parse(event.data);
            console.log(_msg)
            switch(_msg.type) {
                case "ACCESS_ALLOWED":
                    setUrl(_msg.url);
                    setLoading(!loading);
                    break;
                case "ARE_YOU_ALIVE":
                    ws.send(JSON.stringify({type: "I_AM_ALIVE"}))
                    break;
                default:
                    console.log(1)
                    break;
            }
        }

        ws.onclose = (event) => {
            console.log('conection closed!')
        }
    }, []);

    const returnFLV = (link) => {
        console.log("FLV Player");
        return <ReactFlvPlayer url={link} width="100%" 
        controls={true} isMuted={false} />
    }

    const returnHLS = (link) => {
        console.log("HLS Player")
        return <ReactHlsPlayer url={link} autoplay={true} 
        controls={true} width="100%" height="auto" />
    }

    if (loading) {
        return (
            <div className="fullLoading">
                <img src={loadingV} id="loading"/>
            </div>
        );
    } else {
        return (
            <div className="maindiv">
                <img src={top} id="top"/>
                <div className="container">
                    { userAgent === "Safari" ? returnHLS(url) : returnFLV(url)}
                </div>
                <img src={bottom} id="bottom"/>
            </div>
        );
    }
}

export default Main;