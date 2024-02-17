import { IConstraints, IStartStream } from "../models/provider-models";
import { recorderProvider } from "./recorder-provider";

class StreamProvider {
  private stream: MediaStream | undefined;
  private lastVideoDeviceId: string | undefined = undefined;
  private lastAudioDeviceId: string | undefined = undefined;
  private replayRecording = false;

  private constraints: IConstraints = {
    audio: {
      deviceId: this.lastAudioDeviceId,
    },
    video: {
      deviceId: this.lastVideoDeviceId,
      width: 1280,
      height: 720,
    },
  };

  public getStream(): MediaStream | undefined {
    return this.stream;
  }

  public async startStream({
    videoDeviceID,
    audioDeviceID,
    onDeviceChange,
    onStart,
  }: IStartStream): Promise<void> {
    try {
      const constraints = this.constraints;

      if (this.stream) {
        this.stopStream();
      }
      if (audioDeviceID) {
        constraints.audio.deviceId = audioDeviceID;
      }
      if (videoDeviceID) {
        constraints.video.deviceId = videoDeviceID;
      }

      const video = document.querySelector("video")!;
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };

      onDeviceChange({
        videoTrack: stream.getVideoTracks()?.[0],
        audioTrack: stream.getAudioTracks()?.[0],
      });

      this.stream = stream;

      if (this.replayRecording) {
        recorderProvider.startRecording(stream, () => {});
        this.replayRecording = false;
      }
      onStart();
    } catch (e) {
      console.log("Error trying to start stream - ", e);
    }
  }

  public stopStream(onStop?: VoidFunction): void {
    if (!this.stream) return;

    if (onStop) onStop();

    if (recorderProvider.getRecorder()) {
      recorderProvider.stopRecording();
      this.replayRecording = true;
    }

    this.stream.getTracks().forEach((track) => track.stop());
  }
}

export const streamProvider = new StreamProvider();
