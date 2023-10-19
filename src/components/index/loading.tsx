import { useEffect, useState } from "react";
import useFadeIn from "../../hooks/use-fade";
import { animated } from "@react-spring/web";

type Props = {
  unload: boolean;
  hide: boolean;
};

const Loading = ({ unload, hide }: Props) => {
  const [unmount, setUnmount] = useState(false);

  const [style] = useFadeIn(!unload);

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
      style={{
        ...style,
        ...(!unload ? { opacity: 1 } : {}),
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        color: "white",
        zIndex: -1,
        backgroundColor: "rgba(0,0,0,0)",
      }}
    >
      <p style={{ fontFamily: "Martian Mono" }}>
        GETTING READY... <span id="loadingSpinner"> </span>
      </p>
    </animated.div>
  );
};

export default Loading;
