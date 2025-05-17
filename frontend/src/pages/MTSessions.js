import { useState } from 'react';
import ReactPlayer from 'react-player';
import '../styles/MTSessions.css';

export default function MTSessions() {
    const [showVideo, setShowVideo] = useState({
        hernas: false,
    });

    const toggleVideo = (dj) => {
        setShowVideo((prev) => ({ ...prev, [dj]: !prev[dj] }));
    };

    return (
        <div className="mt-container">
            <h1 className="mt-title">MT SESSIONS - OUR DJ'S</h1>

            {/* Hernas */}
            <div className="dj-container">
                <div className="dj-image-wrapper" onClick={() => toggleVideo('hernas')}>
                    <img
                        src="/team/Hernas.jpg"
                        alt="Hernas"
                        className="dj-image"
                    />
                    <div className="hover-text">Click here to watch a special set!</div>
                </div>
                <h2 className="dj-name">HERNAS</h2>

                {showVideo.hernas && (
                    <div className="video-wrapper">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/ua76F7kYAtA?start=2226"
                            title="Hernas YouTube Set"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                <div className="player-list">
                    <ReactPlayer
                        url="https://soundcloud.com/hernas1/setzao-pa-malta"
                        controls
                        width="100%"
                    />
                    <ReactPlayer
                        url="https://soundcloud.com/hernas1/set-komplex"
                        controls
                        width="100%"
                    />
                </div>
            </div>

            {/* Jobels */}
            <div className="dj-container">
                <img src="/team/henrique.jpg" alt="Jobels" className="dj-image" />
                <h2 className="dj-name">JOBELS</h2>
                <div className="player-list">
                    <ReactPlayer
                        url="https://soundcloud.com/barata-518746737/barata-x-jobels-toxic-session"
                        controls
                        width="100%"
                    />
                    <ReactPlayer
                        url="https://soundcloud.com/henrique-sm-reynaud/set-ftk-1"
                        controls
                        width="100%"
                    />
                </div>
            </div>

            {/* Taia */}
            <div className="dj-container">
                <img src="/team/GonçaloTaia.jpg" alt="Dewon" className="dj-image" />
                <h2 className="dj-name">DEWON</h2>
                <div className="player-list">
                    <ReactPlayer
                        url="https://soundcloud.com/user-274639386/technoland-1-1"
                        controls
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
}
