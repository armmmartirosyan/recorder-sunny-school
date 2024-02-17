export interface IMediaContex {
  streamOn: boolean;
  recordingOn: boolean;
  toggleStreamOn: (newValue: boolean) => void;
  toggleRecordingOn: (newValue: boolean) => void;
}
