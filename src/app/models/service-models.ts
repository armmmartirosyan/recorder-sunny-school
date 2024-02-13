export type Track = MediaStreamTrack | undefined;
export interface IConstraints{
    audio: {
        deviceId: string | undefined
    },
    video: {
        deviceId: string | undefined,
        width: number,
        height: number
    },
}

export interface IGetDevices {
    cameras: MediaDeviceInfo[],
    microphones: MediaDeviceInfo[],
    speakers: MediaDeviceInfo[]
}

export interface IMediaTracks {
    videoTrack:  Track,
    audioTrack:  Track
}