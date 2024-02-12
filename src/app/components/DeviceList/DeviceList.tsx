import React, {useEffect, useState} from 'react';

export function DeviceList() {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>();

    useEffect( () => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            setDevices(devices);
        });
    }, []);

    if (!devices) {
        return null;
    }

    return (
        <>
            Audio devices
            <ul id="audioList">
                {devices.filter(device => device.kind.includes("audio")).map((device, index) => (
                    <li key={device.label + index}>{device.label}</li>
                ))}
            </ul>
            video devices
            <ul id="videoList">
                {devices.filter(device => device.kind.includes("video")).map((device, index) => (
                    <li key={device.label + index}>{device.label}</li>
                ))}
            </ul>
        </>
    );
}
