import { useEffect, useState } from "react";
import { BiCodeAlt } from "react-icons/bi";
import { FiCamera, FiYoutube } from "react-icons/fi";
import { RiHome8Line } from "react-icons/ri";
import { usePageLoadTypeStore } from "../hooks/use-store";

import NavigationBar from "../components/navigation-bar";
import useNavigate from "../hooks/use-navigate";
import { applyConditionalStyle } from "../utils/apply";

const VideoPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [unload, setUnloaded] = useState(false);
  const [playFullyUnloadAnimation, setPlayFullyUnloadAnimation] =
    useState(false);
  const { playPageFullLoad } = usePageLoadTypeStore();

  console.log(playPageFullLoad);

  const handleNavigate = () => setUnloaded(true);

  const [navigateToIndex] = useNavigate("/", 500, [
    handleNavigate,
    () => setPlayFullyUnloadAnimation(true),
  ]);
  const [navigateToVideo] = useNavigate("/video", 500, [handleNavigate]);
  const [navigateToPhoto] = useNavigate("/photo", 500, [handleNavigate]);

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
          playFullyUnloadAnimation,
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
        actions={[
          { icon: RiHome8Line, navigate: navigateToIndex },
          { icon: FiYoutube, navigate: navigateToVideo },
          { icon: FiCamera, navigate: navigateToPhoto },
        ]}
      />
    </>
  );
};

export default VideoPage;
