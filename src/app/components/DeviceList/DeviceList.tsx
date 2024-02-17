import React, { Fragment, JSX, useContext, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { DeviceGroup } from "../DeviceGroup";
import { IDeviceListProps } from "../../models/component-models";
import { devicesProvider } from "../../providers/devices-provider";
import { IGetDevices } from "../../models/provider-models";
import { streamProvider } from "../../providers/stream-provider";
import { MediaContext } from "../../contexts";
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

  const handleChangeVideoDevice = async (
    deviceId: string | undefined
  ): Promise<void> => {
    await streamProvider.startStream({
      onStart,
      onDeviceChange,
      videoDeviceID: deviceId,
    });
  };

  const handleChangeAudioDevice = async (
    deviceId: string | undefined
  ): Promise<void> => {
    await streamProvider.startStream({
      onStart,
      onDeviceChange,
      audioDeviceID: deviceId,
    });
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
          onDeviceClick={handleChangeVideoDevice}
          currentDevice={currentVideoDevice}
        />
      )}

      {microphones && (
        <DeviceGroup
          title="microphones"
          devices={microphones}
          onDeviceClick={handleChangeAudioDevice}
          currentDevice={currentAudioDevice}
        />
      )}

      {speakers && (
        <DeviceGroup
          title="speakers"
          devices={speakers}
          onDeviceClick={handleChangeAudioDevice}
          currentDevice={currentAudioDevice}
        />
      )}
    </div>
  );
}
