import { animated, useTrail } from '@react-spring/web';

type Props = {
  shown: boolean;
  hide: boolean;
  children: React.ReactNode;
};

const TitleBar = ({ shown, hide, children }: Props) => {
  const [trails] = useTrail(
    2,
    () => ({
      from: {
        opacity: 0,
        x: -25,
      },
      to: {
        opacity: 1,
        x: 0,
      },
      reverse: !shown,
      immediate: hide,
      reset: true,
    }),
    [shown, hide]
  );

  return (
    <div className="ml-[23vw] relative">
      <div className="absolute xl:h-80 h-60 w-1 bg-white rotate-[30deg] translate-x-[-30px] translate-y-[-100px]"></div>
      <animated.h1
        className={`font-heading font-bold xl:text-8xl text-6xl text-white ml-[40px]`}
        style={trails[0]}
      >
        HEY, I’M MATT
      </animated.h1>
      <div>
        <animated.h1
          className={`text-white xl:text-3xl text-xl`}
          style={trails[1]}
        >
          I make {children}, and more.
        </animated.h1>
      </div>
    </div>
  );
};

export default TitleBar;
