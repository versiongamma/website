import { useSpring } from "@react-spring/web";

const useFadeIn = (unload: boolean, from: number = 0) => {
  const [springs] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reset: true,
      reverse: unload,
    }),
    [unload]
  );

  return [springs] as const;
};

export default useFadeIn;
