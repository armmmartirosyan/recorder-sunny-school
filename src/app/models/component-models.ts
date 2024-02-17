import { IMediaTracks, Track } from "./provider-models";

export type changeDeviceFunction = (deviceId: string) => Promise<void>;

export interface ICameraProps {
  onDeviceChange: (args: IMediaTracks) => void;
  allowRecord: boolean;
}

export interface IDeviceListProps {
  onDeviceChange: (args: IMediaTracks) => void;
  currentVideoDevice: Track;
  currentAudioDevice: Track;
}

export interface IDeviceGroupProps {
  devices: MediaDeviceInfo[];
  title: string;
  onDeviceClick?: changeDeviceFunction;
  currentDevice: Track;
}
