export type Track = MediaStreamTrack | undefined;
export interface IConstraints {
  audio: {
    deviceId: string | undefined;
  };
  video: {
    deviceId: string | undefined;
    width: number;
    height: number;
  };
}

export interface IGetDevices {
  cameras: MediaDeviceInfo[];
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
}

export interface IMediaTracks {
  videoTrack: Track;
  audioTrack: Track;
}

export type onDeviceChange = (tracks: IMediaTracks) => void;

export interface IDeviceIDs {
  videoDeviceID?: string;
  audioDeviceID?: string;
}

export interface IStartStream {
  videoDeviceID?: string;
  audioDeviceID?: string;
  onDeviceChange: onDeviceChange;
  onStart: VoidFunction;
}

export interface IChunk {
  chunkID: number;
  data: BlobEvent["data"];
}
