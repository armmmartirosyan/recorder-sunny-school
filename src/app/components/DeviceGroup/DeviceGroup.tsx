import React, {useCallback} from 'react';
import {IDeviceGroupProps} from "../../models/component-models";
import "./DeviceGroup.scss";

export function DeviceGroup({
                                devices,
                                title,
                                onDeviceClick,
                                currentDevice
                            }: IDeviceGroupProps) {
    const handleClick = useCallback(async (deviceId: string) => {
        if (onDeviceClick) {
            await onDeviceClick(deviceId);
        }
    }, [onDeviceClick]);

    return (
        <div>
            <h5 className="devices_title">
                {title}
            </h5>

            <ul id="audioList" className="devices_list">
                {devices && devices.map((device, index) => (
                    <li
                        key={device.label + index}
                        className={`device ${currentDevice?.label === device.label ? "active" : ""}`}
                        onClick={() => handleClick(device.deviceId)}
                    >
                        {device.label} - {device.deviceId}
                    </li>
                ))}
            </ul>
        </div>
    );
}