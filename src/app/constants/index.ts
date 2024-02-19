import { IRecordingType } from "../models/shared-models";

export const DB_NAME = "recorder-db";

export const STORE_NAME = "recording";

export const DB_VERSION = 1;

export const RECORD_TYPES_LIST: IRecordingType[] = [
  {
    mimeType: "video/webm",
    extension: ".webm",
  },
  {
    mimeType: "video/mp4",
    extension: ".mp4",
  },
] as const;

export const RECORD_TYPE: IRecordingType | undefined = RECORD_TYPES_LIST.find(
  (type) => {
    return MediaRecorder.isTypeSupported(type.mimeType);
  }
);
