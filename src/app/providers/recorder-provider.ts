import { isEmpty } from "lodash";
import { IChunk } from "../models/provider-models";
import { dbProvider } from "./db-provider";
import { RECORD_MIME_TYPE } from "../constants";
import { downloadRecording } from "../utils";

const CHUNK_DURATION = 2000;
let chunkID = 1;

class RecorderProvider {
  private recorder: MediaRecorder | null = null;

  public getRecorder() {
    return this.recorder;
  }

  public startRecording(
    stream: MediaStream,
    onRecordStart: VoidFunction
  ): void {
    this.recorder = new MediaRecorder(stream, { mimeType: RECORD_MIME_TYPE });
    this.recorder.start(CHUNK_DURATION);

    this.recorder.onstart = () => this.onStart(onRecordStart);
    this.recorder.onerror = this.onError;
    this.recorder.ondataavailable = this.onDataAvailable;
  }

  public async stopRecording(): Promise<void> {
    if (!this.recorder) return;

    this.recorder.stop();
    this.recorder = null;

    setTimeout(() => {
      dbProvider.getItems().then((chunks) => {
        if (!isEmpty(chunks)) {
          downloadRecording(chunks as IChunk[]);
          dbProvider.clear();
        }
      });
    });
  }

  private onDataAvailable(event: BlobEvent) {
    dbProvider.addItem({
      chunkID: chunkID++,
      data: event.data,
    });
  }

  private onStart(onRecordStart: VoidFunction) {
    onRecordStart();
  }

  private onError(e: any) {
    console.log("Error trying to start recording - ", e);
  }
}

export const recorderProvider = new RecorderProvider();
