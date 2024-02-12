import React, {useCallback, useEffect, useState} from 'react';
import {MediaService} from "./services/MediaService";
import {Camera} from "./components/Camera";
import {DeviceList} from "./components/DeviceList";
import "../assets/styles/style.scss";

function App() {
    const [mediaStream, setMediaStream] = useState<MediaStream>();
    const [videoDevice, setVideoDevice] = useState("");
    const [audioDevice, setAudioDevice] = useState("");

    const handleRecord = useCallback(async () => {
        const mediaService = new MediaService();

        const mediaStream = await mediaService.play();

        if (mediaStream) {
            setMediaStream(mediaStream);
        }
    }, []);

    const handleStop = useCallback(() => {
        mediaStream?.getTracks().forEach(track => track.stop());
        setMediaStream(undefined);
    }, [mediaStream]);

    useEffect(() => {
        return mediaStream?.getTracks().forEach(track => track.stop());
    }, []);

    return (
        <div className="wrapper">
            <Camera
                mediaStream={mediaStream}
                handleRecord={handleRecord}
                handleStop={handleStop}
            />

            <DeviceList/>
        </div>
    );
}

export default App;
