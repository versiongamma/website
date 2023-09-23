import { animated, useTrail } from "@react-spring/web";
import { useEffect } from "react";

type Props = {
  shown: boolean;
  unload: boolean;
  children: React.ReactNode;
};

const TitleBar = ({ shown, unload, children }: Props) => {
  const [trails, api] = useTrail(2, () => ({
    opacity: 0,
    x: -25,
  }));

  useEffect(() => {
    if (shown) {
      setTimeout(() => {
        api.start({
          from: {
            opacity: 0,
            x: -25,
          },
          to: {
            opacity: 1,
            x: 0,
          },
        });
      }, 150);
    }

    if (unload) {
      api.start({
        from: {
          opacity: 1,
          x: 0,
        },
        to: {
          opacity: 0,
          x: -25,
        },
      });
    }
  }, [shown, unload]);

  return (
    <div className="m-[300px] relative">
      <div className="absolute h-96 w-1 bg-white rotate-[30deg] translate-x-[-30px] translate-y-[-100px]"></div>
      <animated.h1
        className={`font-heading font-bold text-[7rem] text-white ml-[40px]`}
        style={trails[0]}
      >
        VERSION GAMMA
      </animated.h1>
      <div>
        <animated.p className={`text-white text-3xl`} style={trails[1]}>
          making {children}, and more.
        </animated.p>
      </div>
    </div>
  );
};

export default TitleBar;
