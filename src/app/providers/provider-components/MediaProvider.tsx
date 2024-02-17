import React, { useCallback, useState } from "react";
import { MediaContext } from "../../contexts";

export default function MediaProvider({ children }: { children: any }) {
  const [streamOn, setStreamOn] = useState(false);
  const [recordingOn, setRecordingOn] = useState(false);

  const toggleStreamOn = useCallback((newValue: boolean) => {
    if (typeof newValue === "boolean") {
      setStreamOn(newValue);
      return;
    }

    setStreamOn((prev) => !prev);
  }, []);

  const toggleRecordingOn = useCallback((newValue: boolean) => {
    if (typeof newValue === "boolean") {
      setRecordingOn(newValue);
      return;
    }

    setRecordingOn((prev) => !prev);
  }, []);

  return (
    <MediaContext.Provider
      value={{ streamOn, toggleStreamOn, recordingOn, toggleRecordingOn }}
    >
      {children}
    </MediaContext.Provider>
  );
}
