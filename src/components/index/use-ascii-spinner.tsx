import { useEffect, useState } from "react";

const CHARS = ["-", "\\", "|", "/"];

const useAsciiSpinner = (speed: number) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setFrame((currentFrame) =>
        currentFrame === CHARS.length - 1 ? 0 : currentFrame + 1
      );
    }, speed);
  }, []);

  return CHARS[frame];
};

export default useAsciiSpinner;
