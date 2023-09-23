import { memo, useMemo, useState } from "react";

type AnimationDefinition = {
  animation: string;
  duration: number;
};

const useAnimate = (
  animations: {
    enter: AnimationDefinition;
    exit: AnimationDefinition;
  },
  hiddenByDefault = true
) => {
  const [shown, setShown] = useState(true);
  const { enter, exit } = animations;

  const enterAnimationCss = `${enter.animation} ${(
    enter.duration / 1000
  ).toFixed(1)}s ease`;
  const exitAnimationCss = `${exit.animation} ${(exit.duration / 1000).toFixed(
    1
  )}s ease`;

  const [style, setStyle] = useState<{ animation?: string; opacity: number }>({
    opacity: hiddenByDefault ? 0 : 1,
  });

  const load = () => {
    const s = {
      opacity: 1,
      animation: enterAnimationCss,
    };

    console.log(s);

    setStyle(s);
    setShown(true);
    setTimeout(() => setStyle({ opacity: 1 }));
  };

  const unload = () => {
    setStyle((prev) => ({
      ...prev,
      animation: exitAnimationCss,
    }));
    setShown(false);
    setTimeout(() => setStyle({ opacity: 0 }));
  };

  return [style, load, unload, shown] as const;
};

export default useAnimate;
