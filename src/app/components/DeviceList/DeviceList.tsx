import React, { Fragment, JSX, useContext, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { DeviceGroup } from "../DeviceGroup";
import { IDeviceListProps } from "../../models/component-models";
import { devicesProvider } from "../../providers/devices-provider";
import { IGetDevices } from "../../models/provider-models";
import { streamProvider } from "../../providers/stream-provider";
import { MediaContext } from "../../contexts";
import { recorderProvider } from "../../providers/recorder-provider";
import "./DeviceList.scss";

export function DeviceList({
  onDeviceChange,
  currentVideoDevice,
  currentAudioDevice,
}: IDeviceListProps): JSX.Element {
  const { toggleStreamOn, streamOn } = useContext(MediaContext);

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>();
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>();

  const onStart = () => {
    toggleStreamOn(true);
  };

  const handleDeviceChange = async (
    deviceId: string | undefined,
    keyName: string
  ): Promise<void> => {
    const restartRecordinng = recorderProvider.isRecording();

    if (restartRecordinng) {
      recorderProvider.stopRecording();
    }

    await streamProvider.startStream({
      onStart,
      onDeviceChange,
      [keyName]: deviceId,
    });

    if (restartRecordinng) {
      recorderProvider.startRecording(streamProvider.getStream()!, () => {});
    }
  };

  useEffect(() => {
    devicesProvider.getDevices().then((devices: IGetDevices) => {
      setCameras(devices.cameras);
      setSpeakers(devices.speakers);
      setMicrophones(devices.microphones);
    });
  }, []);

  if (isEmpty(cameras) && isEmpty(speakers) && isEmpty(microphones)) {
    return <Fragment />;
  }

  return (
    <div className="devices_container">
      {cameras && (
        <DeviceGroup
          title="cameras"
          devices={cameras}
          onDeviceClick={handleDeviceChange}
          currentDevice={currentVideoDevice}
          keyName="videoDeviceID"
        />
      )}

      {microphones && (
        <DeviceGroup
          title="microphones"
          devices={microphones}
          onDeviceClick={handleDeviceChange}
          currentDevice={currentAudioDevice}
          keyName="audioDeviceID"
        />
      )}

      {speakers && (
        <DeviceGroup
          title="speakers"
          devices={speakers}
          onDeviceClick={handleDeviceChange}
          currentDevice={currentAudioDevice}
          keyName="audioDeviceID"
        />
      )}
    </div>
  );
}
