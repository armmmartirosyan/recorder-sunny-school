import React, { JSX, useCallback, useEffect, useState } from "react";
import { MediaService } from "./services/MediaService";
import { Camera, DeviceList } from "./components";
import { IMediaTracks, Track } from "./models/service-models";
import "../assets/styles/style.scss";

function App(): JSX.Element {
  const [mediaService, setMediaService] = useState<MediaService>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Track>();
  const [currentAudioDevice, setCurrentAudioDevice] = useState<Track>();

  const handleRecord = useCallback(async () => {
    await mediaService?.play();
  }, [mediaService]);

  const handleStop = useCallback(() => {
    mediaService?.pause();
  }, [mediaService]);

  const handleChangeVideoDevice = useCallback(
    async (deviceId: string | undefined): Promise<void> => {
      await mediaService?.changeVideoDevice(deviceId);
    },
    [mediaService]
  );

  const handleChangeAudioDevice = useCallback(
    async (deviceId: string | undefined): Promise<void> => {
      await mediaService?.changeAudioDevice(deviceId);
    },
    [mediaService]
  );

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleDeviceChange = useCallback(
    ({ videoTrack, audioTrack }: IMediaTracks) => {
      setCurrentVideoDevice(videoTrack);
      setCurrentAudioDevice(audioTrack);
    },
    []
  );

  useEffect(() => {
    const mediaService = new MediaService(
      handlePlay,
      handlePause,
      handleDeviceChange
    );

    setMediaService(mediaService);

    return mediaService.pause;
  }, []);

  return (
    <div className="wrapper">
      <Camera
        isPlaying={isPlaying}
        onRecord={handleRecord}
        onStop={handleStop}
      />

      <DeviceList
        mediaService={mediaService}
        changeVideoDevice={handleChangeVideoDevice}
        changeAudioDevice={handleChangeAudioDevice}
        currentVideoDevice={currentVideoDevice}
        currentAudioDevice={currentAudioDevice}
      />
    </div>
  );
}

export default App;
