import React, { JSX, memo, useEffect, useState } from "react";
import { Camera, DeviceList } from "./components";
import { IMediaTracks, Track } from "./models/provider-models";
import { streamProvider } from "./providers/stream-provider";
import { dbProvider } from "./providers/db-provider";
import "../assets/styles/style.scss";

const App = memo(function (): JSX.Element {
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Track>();
  const [currentAudioDevice, setCurrentAudioDevice] = useState<Track>();
  const [allowRecord, setAllowRecord] = useState(false);

  const onDeviceChange = ({ videoTrack, audioTrack }: IMediaTracks) => {
    setCurrentVideoDevice(videoTrack);
    setCurrentAudioDevice(audioTrack);
  };

  const handleAllowRecord = () => {
    setAllowRecord(true);
  };

  useEffect(() => {
    dbProvider.openDB(handleAllowRecord);
    return streamProvider.stopStream();
  }, []);

  return (
    <div className="wrapper">
      <Camera allowRecord={allowRecord} onDeviceChange={onDeviceChange} />

      <DeviceList
        onDeviceChange={onDeviceChange}
        currentVideoDevice={currentVideoDevice}
        currentAudioDevice={currentAudioDevice}
      />
    </div>
  );
});

export default App;
