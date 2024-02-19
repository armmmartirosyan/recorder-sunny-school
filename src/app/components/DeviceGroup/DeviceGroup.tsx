import React, { useCallback } from "react";
import { IDeviceGroupProps } from "../../models/component-models";
import "./DeviceGroup.scss";

export function DeviceGroup({
  devices,
  title,
  onDeviceClick,
  currentDevice,
  keyName,
}: IDeviceGroupProps) {
  const handleClick = useCallback(
    async (deviceId: string) => {
      if (onDeviceClick) {
        await onDeviceClick(deviceId, keyName);
      }
    },
    [onDeviceClick, keyName]
  );

  return (
    <div>
      <h5 className="devices_title">{title}</h5>

      <ul className="devices_list">
        {devices &&
          devices.map((device, index) => (
            <li
              key={device.label + index}
              className={`device ${
                currentDevice?.label === device.label ? "active" : ""
              }`}
              onClick={() => handleClick(device.deviceId)}
            >
              {device.label} - {device.deviceId}
            </li>
          ))}
      </ul>
    </div>
  );
}
