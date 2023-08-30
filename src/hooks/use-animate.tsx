import { useState } from "react";

const useAnimate = (showByDefault = true) => {
  const [shown, setShown] = useState(showByDefault);
  const [hidden, setHidden] = useState(false);

  const load = () => {
    setShown(true);
    setHidden(false);
  };
  const unload = () => {
    setHidden(true);
    setShown(false);
  };

  return [shown, hidden, load, unload] as const;
};

export default useAnimate;
