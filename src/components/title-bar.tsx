import { animated, useTrail } from "@react-spring/web";
import { useEffect } from "react";

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
    <div className="m-[300px] relative">
      <div className="absolute h-96 w-1 bg-white rotate-[30deg] translate-x-[-30px] translate-y-[-100px]"></div>
      <animated.h1
        className={`font-heading font-bold text-[7rem] text-white ml-[40px]`}
        style={trails[0]}
      >
        HELLO, I'M MATT
      </animated.h1>
      <div>
        <animated.p className={`text-white text-3xl`} style={trails[1]}>
          I make {children}, and more.
        </animated.p>
      </div>
    </div>
  );
};

export default TitleBar;
