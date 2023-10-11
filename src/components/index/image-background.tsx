import { animated, useSpring } from "@react-spring/web";

type Props = {
  shown: boolean;
  unload: boolean;
  children: React.ReactNode;
};

const ImageBackground = ({ shown, unload, children }: Props) => {
  const fadeOut = !shown && unload;
  const hide = !shown && !unload;

  const [props] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reverse: hide || fadeOut,
      immediate: hide,
    }),
    [shown, unload]
  );
  return (
    <animated.div
      className="flex w-screen h-screen overflow-hidden items-center snap-center snap-always"
      style={{
        background: 'url("/static/background.webp") right center fixed',
        backgroundSize: "cover",
        ...props,
      }}
    >
      {children}
    </animated.div>
  );
};

export default ImageBackground;
