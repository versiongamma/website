import { animated, useSpring } from "@react-spring/web";

const ENTER_DELAY = 1000;

type Props = {
  shown: boolean;
  hide: boolean;
};

const CallToAction = ({ shown, hide }: Props) => {
  const [springs] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: shown ? ENTER_DELAY : 0,
      reverse: !shown,
      immediate: hide,
    }),
    [shown, hide]
  );

  return (
    <animated.img
      style={springs}
      src="/static/call-to-action.webp"
      width={256}
      className="absolute bottom-4 -md:left-[40%] left-1/2 -sm:hidden"
    />
  );
};

export default CallToAction;
