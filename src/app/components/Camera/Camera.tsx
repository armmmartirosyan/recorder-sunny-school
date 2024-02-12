import React from 'react';

interface ICamera {
    mediaStream: any,
    handleRecord: any,
    handleStop: any
}

export function Camera({
                           mediaStream,
                           handleRecord,
                           handleStop
                       }: ICamera) {
    return (
        <>
            <video
                id="video"
                className="video_container"
            />

            {(!mediaStream) && (
                <button onClick={handleRecord}>
                    Record
                </button>
            )}

            {(mediaStream) && (
                <button onClick={handleStop}>
                    Stop
                </button>
            )}
        </>
    );
}
