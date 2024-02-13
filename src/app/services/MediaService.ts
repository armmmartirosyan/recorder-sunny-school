import {IConstraints, IGetDevices, IMediaTracks} from "../models/service-models";
import {isEmpty} from "lodash";

export class MediaService {
    private currentMediaStream: MediaStream | undefined;
    private lastVideoDeviceId: string | undefined = undefined;
    private lastAudioDeviceId: string | undefined = undefined;
    private readonly _onPlay: VoidFunction;
    private readonly _onPause: VoidFunction;
    private readonly _onDeviceChange: (obj: IMediaTracks) => void;

    private constraints: IConstraints = {
        audio: {
            deviceId: this.lastAudioDeviceId,
        },
        video: {
            deviceId: this.lastVideoDeviceId,
            width: 1280,
            height: 720
        },
    };

    constructor(
        onPlay: VoidFunction,
        onPause: VoidFunction,
        onDeviceChange: (obj: IMediaTracks) => void
    ) {
        this._onPlay = onPlay;
        this._onPause = onPause;
        this._onDeviceChange = onDeviceChange;
        console.log("rendering in constructor")
    }

    public async getDevices(): Promise<IGetDevices> {
        let deviceList:IGetDevices;

        const devices = await navigator.mediaDevices.enumerateDevices();

        if (!isEmpty(devices)) {
            const cameras = devices.filter(device => device.kind.includes("videoinput"));
            const microphones = devices.filter(device => device.kind.includes("audioinput"));
            const speakers = devices.filter(device => device.kind.includes("audiooutput"));

            deviceList = {
                cameras,
                microphones,
                speakers
            }

            return deviceList
        }

        return {
            cameras: [],
            microphones: [],
            speakers: [],
        }
    }

    public async play(constraints = this.constraints): Promise<void> {
        try{
            const video = document.querySelector("video")!;
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
            };

            this.currentMediaStream = stream;

            this._onPlay();
            this._onDeviceChange({
                videoTrack: stream.getVideoTracks()?.[0],
                audioTrack: stream.getAudioTracks()?.[0],
            });
        }catch (e) {
            console.log(e);
        }
    }

    public pause() {
        if (!this.currentMediaStream) return;

        this.currentMediaStream.getTracks().forEach(track => track.stop());
        this._onPause();
    }

    public async changeVideoDevice(videoDeviceID: string | undefined): Promise<void> {
        const localConstraints = {...this.constraints};

        this.lastVideoDeviceId = videoDeviceID;
        localConstraints.video.deviceId = videoDeviceID;

        await this.play(localConstraints);
    }

    public async changeAudioDevice(audioDeviceID: string | undefined): Promise<void> {
        const localConstraints = {...this.constraints};

        this.lastAudioDeviceId = audioDeviceID;
        localConstraints.audio.deviceId = audioDeviceID;

        await this.play(localConstraints);
    }
}
