import React, { JSX, useContext } from "react";
import { ICameraProps } from "../../models/component-models";
import { streamProvider } from "../../providers/stream-provider";
import { MediaContext } from "../../contexts";
import { recorderProvider } from "../../providers/recorder-provider";
import "./Camera.scss";

export function Camera({
  onDeviceChange,
  allowRecord,
}: ICameraProps): JSX.Element {
  const { toggleStreamOn, toggleRecordingOn, streamOn, recordingOn } =
    useContext(MediaContext);

  const onStreamStart = () => {
    toggleStreamOn(true);
  };

  const onStreamStop = () => {
    toggleStreamOn(false);
  };

  const onRecordStart = () => {
    toggleRecordingOn(true);
  };

  const handleStartRecording = () => {
    const stream = streamProvider.getStream();

    if (!stream) return;

    recorderProvider.startRecording(stream, onRecordStart);
  };

  const handleStopRecording = () => {
    recorderProvider.stopRecording();
    toggleRecordingOn(false);
  };

  const handleStartStream = async () => {
    await streamProvider.startStream({
      onStart: onStreamStart,
      onDeviceChange,
    });
  };

  const handleStopStream = () => {
    handleStopRecording();
    streamProvider.stopStream(onStreamStop);
  };

  return (
    <div className="video_container">
      <video id="video" className="video" />
      <div className="action_buttons_box">
        {streamOn && allowRecord ? (
          <>
            <button onClick={handleStopStream} className="action_button">
              Stop stream
            </button>
            {recordingOn ? (
              <button onClick={handleStopRecording} className="action_button">
                Stop Recording
              </button>
            ) : (
              <button onClick={handleStartRecording} className="action_button">
                Start Recording
              </button>
            )}
          </>
        ) : (
          <>
            <button onClick={handleStartStream} className="action_button">
              Start stream
            </button>
          </>
        )}
      </div>
    </div>
  );
}
