export interface IMediaContex {
  streamOn: boolean;
  recordingOn: boolean;
  toggleStreamOn: (newValue: boolean) => void;
  toggleRecordingOn: (newValue: boolean) => void;
}

export interface IDefer<T> {
  promise: Promise<T> | null;
  resolve: (arg?: T) => void;
  reject: (arg: Error) => void;
  reset: VoidFunction;
}

export interface IRecordingType {
  mimeType: string;
  extension: string;
}
