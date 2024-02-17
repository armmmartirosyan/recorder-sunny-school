import { createContext } from "react";
import { IMediaContex } from "../models/shared-models";

export const MediaContext = createContext({
  streamOn: false,
  recordingOn: false,
  toggleStreamOn: (newValue: boolean) => {},
  toggleRecordingOn: (newValue: boolean) => {},
} as IMediaContex);
