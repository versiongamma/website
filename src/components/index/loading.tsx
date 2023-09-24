import { useEffect, useState } from "react";
import useFadeIn from "../../hooks/use-fade-in";
import { animated } from "@react-spring/web";
import useAsciiSpinner from "./use-ascii-spinner";

type Props = {
  unload: boolean;
  hide: boolean;
};

const Loading = ({ unload, hide }: Props) => {
  const [unmount, setUnmount] = useState(false);
  const spinner = useAsciiSpinner(50);

  const [style] = useFadeIn(unload);

  useEffect(() => {
    if (unload) {
      setTimeout(() => {
        setUnmount(true);
      }, 500);
    }
  }, [unload]);

  if (unmount || hide) {
    return null;
  }

  return (
    <animated.div
      className="fixed flex justify-center items-center w-screen h-screen text-white z[-1] bg-transparent"
      style={style}
    >
      <p className="font-[mono]">GETTING READY... {spinner}</p>
    </animated.div>
  );
};

export default Loading;
