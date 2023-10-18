import { animated, useSpring } from '@react-spring/web';
import { FiArrowDownCircle } from 'react-icons/fi';

const ENTER_DELAY = 2000;

type Props = {
  shown: boolean;
  hide: boolean;
  scrollElementRef: React.RefObject<HTMLElement>;
};

const ScrollDownIndicator = ({ shown, hide, scrollElementRef }: Props) => {
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
    <animated.button
      className={`absolute bottom-10 left-1/2`}
      style={springs}
      onClick={() =>
        scrollElementRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    >
      <FiArrowDownCircle className="w-20 h-20 text-white animate-bounce" />
    </animated.button>
  );
};

export default ScrollDownIndicator;
