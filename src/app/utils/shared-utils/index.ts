import { v4 as uuid } from "uuid";
import { RECORD_TYPE } from "../../constants";
import { IChunk } from "../../models/provider-models";

export function downloadRecording(chunks: IChunk[]) {
  if (!RECORD_TYPE) return;

  const data = chunks.map((chunk: IChunk) => chunk.data);
  const blob = new Blob(data, { type: RECORD_TYPE.mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = uuid() + RECORD_TYPE.extension;
  a.click();
}
