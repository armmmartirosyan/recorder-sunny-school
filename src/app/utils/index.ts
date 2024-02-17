import { v4 as uuid } from "uuid";
import { RECORD_MIME_TYPE } from "../constants";
import { IChunk } from "../models/provider-models";

export function downloadRecording(chunks: IChunk[]) {
  const data = chunks.map((chunk: IChunk) => chunk.data);
  const blob = new Blob(data, { type: RECORD_MIME_TYPE });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = uuid() + ".webm";
  a.click();
}
