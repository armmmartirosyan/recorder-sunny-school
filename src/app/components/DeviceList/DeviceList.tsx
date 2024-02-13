import React, {Fragment, JSX, useEffect, useState} from 'react';
import {isEmpty} from "lodash";
import {DeviceGroup} from "../DeviceGroup";
import {IDeviceListProps} from "../../models/component-models";
import "./DeviceList.scss";

export function DeviceList({
                               currentVideoDevice,
                               currentAudioDevice,
                               mediaService,
                               changeVideoDevice,
                               changeAudioDevice
                           }: IDeviceListProps): JSX.Element {
    const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
    const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>();
    const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>();

    useEffect(() => {
        if (mediaService) {
            mediaService
                .getDevices()
                .then((devices) => {
                    setCameras(devices.cameras);
                    setSpeakers(devices.speakers);
                    setMicrophones(devices.microphones);
                });
        }
    }, [mediaService]);

    if (
        isEmpty(cameras) &&
        isEmpty(speakers) &&
        isEmpty(microphones)
    ) {
        return <Fragment/>;
    }

    return (
        <div className="devices_container">
            {cameras && (
                <DeviceGroup
                    title="cameras"
                    devices={cameras}
                    onDeviceClick={changeVideoDevice}
                    currentDevice={currentVideoDevice}
                />
            )}

            {microphones && (
                <DeviceGroup
                    title="microphones"
                    devices={microphones}
                    onDeviceClick={changeAudioDevice}
                    currentDevice={currentAudioDevice}
                />
            )}

            {speakers && (
                <DeviceGroup
                    title="speakers"
                    devices={speakers}
                    onDeviceClick={changeAudioDevice}
                    currentDevice={currentAudioDevice}
                />
            )}
        </div>
    );
}
