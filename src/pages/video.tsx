import { useEffect, useState } from "react";
import { usePageLoadTypeStore } from "../hooks/use-store";

import NavigationBar from "../components/navigation-bar";
import useNavigate from "../hooks/use-navigate";
import { applyConditionalStyle } from "../utils/apply";

const VideoPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [unload, setUnloaded] = useState(false);
  const { playPageFullLoad } = usePageLoadTypeStore();

  const handleNavigate = () => setUnloaded(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 0);
  }, []);

  const animationStyle = `${applyConditionalStyle(
    loaded,
    "animate-fadeIn",
    "opacity-0"
  )} ${applyConditionalStyle(unload, "animate-fadeOut opacity-0")}`;

  return (
    <>
      <div
        className={`w-screen h-screen flex items-center flex-col justify-center background-gradient ${applyConditionalStyle(
          playPageFullLoad,
          animationStyle
        )} ${applyConditionalStyle(playPageFullLoad, "animate-fadeIn")}`}
      >
        <div
          className={`space-y-2 flex items-center flex-col ${animationStyle}`}
        >
          <h1 className="font-bold font-heading text-4xl animate-slideIn text-white">
            VERSION GAMMA
          </h1>
          <p className="text-white">This is the video page.</p>
        </div>
      </div>
      <NavigationBar
        show={loaded && !unload}
        hide={unload}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default VideoPage;
