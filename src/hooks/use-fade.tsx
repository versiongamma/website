import { useSpring } from "@react-spring/web";

const useFadeIn = (
  shown: boolean,
  immediate: boolean = false,
  onFadeOut?: () => void
) => {
  const [springs] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reset: true,
      immediate,
      reverse: !shown,
      onRest: () => {
        if (!shown && !!onFadeOut) {
          onFadeOut();
        }
      },
    }),
    [shown, immediate]
  );

  return [springs] as const;
};

export default useFadeIn;
