import {MediaService} from "../services/MediaService";
import {Track} from "./service-models";

export type changeDeviceFunction = (deviceId: string) => Promise<void>

export interface ICameraProps {
    isPlaying: boolean,
    onRecord: VoidFunction,
    onStop: VoidFunction
}

export interface IDeviceListProps {
    changeVideoDevice: changeDeviceFunction,
    changeAudioDevice: changeDeviceFunction,
    mediaService: MediaService | undefined
    currentVideoDevice: Track,
    currentAudioDevice: Track,
}

export interface IDeviceGroupProps {
    devices: MediaDeviceInfo[],
    title: string,
    onDeviceClick?: changeDeviceFunction,
    currentDevice: Track
}