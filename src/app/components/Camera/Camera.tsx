import React, {JSX} from 'react';
import {ICameraProps} from "../../models/component-models";
import "./Camera.scss";

export function Camera({
                           onRecord,
                           onStop,
                           isPlaying
                       }: ICameraProps): JSX.Element {
    return (
        <div className="video_container">
            <video
                id="video"
                className="video"
            />

            {(isPlaying) ? (
                <button
                    onClick={onStop}
                    className="action_button"
                >
                    Stop
                </button>
            ) : (
                <button
                    onClick={onRecord}
                    className="action_button"
                >
                    Record
                </button>
            )}
        </div>
    );
}
