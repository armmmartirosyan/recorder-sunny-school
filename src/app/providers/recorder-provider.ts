import { isEmpty } from "lodash";
import { IChunk } from "../models/provider-models";
import { dbProvider } from "./db-provider";
import { RECORD_TYPE } from "../constants";
import { downloadRecording } from "../utils/shared-utils";
import { createDefer } from "../utils/async-utils";

const CHUNK_DURATION = 2000;
let chunkID = 1;

class RecorderProvider {
  private recorder: MediaRecorder | null = null;
  public doesHaveTheLastChunk: boolean = false;
  public haveTheLastChunkDefer = createDefer<boolean>();

  public isRecording(): boolean {
    return !!this.recorder && this.recorder.state === "recording";
  }

  public startRecording(
    stream: MediaStream,
    onRecordStart: VoidFunction
  ): void {
    if (!RECORD_TYPE) {
      this.onError("The browser doesn't support any video type we need.");
      return;
    }

    dbProvider.getItems().then((data) => {
      if (!isEmpty(data)) {
        dbProvider.clear();
      }
    });

    this.recorder = new MediaRecorder(stream, {
      mimeType: RECORD_TYPE?.mimeType,
    });
    this.recorder.start(CHUNK_DURATION);
    this.doesHaveTheLastChunk = false;

    this.recorder.onstart = () => this.onStart(onRecordStart);
    this.recorder.ondataavailable = this.onDataAvailable;
    this.recorder.onerror = this.onError;
  }

  public async stopRecording(): Promise<void> {
    if (!this.recorder) return;

    this.recorder.stop();
    await this.download();
  }

  private onDataAvailable = (event: BlobEvent): void => {
    dbProvider.addItem({
      chunkID: chunkID++,
      data: event.data,
    });

    if (this.recorder?.state === "inactive") {
      this.haveTheLastChunkDefer.resolve(true);
    }
  };

  private onStart(onRecordStart: VoidFunction): void {
    onRecordStart();
  }

  private onError(e: any): void {
    console.log("Error trying to start recording - ", e);
  }

  private async download(): Promise<void> {
    const haveLastChunk = await this.haveTheLastChunkDefer.promise!;

    if (haveLastChunk) {
      dbProvider.getItems().then((chunks) => {
        if (!isEmpty(chunks)) {
          downloadRecording(chunks as IChunk[]);
          dbProvider.clear();
        }
      });
    }
  }
}

export const recorderProvider = new RecorderProvider();
