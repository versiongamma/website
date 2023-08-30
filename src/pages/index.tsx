import { useEffect, useRef, useState } from "react";
import { FiArrowDownCircle } from "react-icons/fi";

import TitleBar from "../components/title-bar";
import useNavigate from "../hooks/use-navigate";
import { applyConditionalStyle } from "../utils/style";
import NavigationBar from "../components/navigation-bar";
import useViewport from "../hooks/use-viewport";
import useAnimate from "../hooks/use-animate";

const TEST_LOAD_TIME = 100;

const IndexPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [unload, setUnloaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [navBarHasAppeared, setNavBarHasAppeared] = useState(false);
  const [showNavBar, hideNavBar, loadNavBar, unloadNavBar] = useAnimate(false);

  const handleNavigate = () => setUnloaded(true);

  const [navigateToVideo] = useNavigate("/video", 500, [handleNavigate]);
  const [navigateToPhoto] = useNavigate("/photo", 500, [handleNavigate]);
  const [navigateToSoftware] = useNavigate("/software", 500, [handleNavigate]);

  const infoRef = useRef<HTMLDivElement>(null);
  const { height: viewportHeight } = useViewport();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, TEST_LOAD_TIME);
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const position = event.currentTarget.scrollTop;
    setScrollPosition(position);

    if (position >= viewportHeight) {
      setNavBarHasAppeared(true);
      loadNavBar();
    }

    if (position < viewportHeight && navBarHasAppeared) {
      console.log("what");
      unloadNavBar();
    }
  };

  const atTopOfPage = scrollPosition === 0;
  const atBottomOfPage = scrollPosition === viewportHeight;
  return (
    <>
      <div
        className="snap-y snap-mandatory overflow-y-auto w-screen h-screen"
        onScroll={handleScroll}
      >
        <div
          className={`flex w-screen h-screen overflow-hidden items-center snap-center snap-always ${applyConditionalStyle(
            loaded,
            "animate-[fadeIn_0.3s]",
            "opacity-0"
          )} ${applyConditionalStyle(unload, "animate-fadeOut opacity-0")}`}
          style={{
            background: 'url("background.png") right center fixed',
            backgroundSize: "cover",
          }}
        >
          <TitleBar show={loaded} hide={unload}>
            <a className="text-link" onClick={navigateToVideo}>
              VIDEOS
            </a>
            ,{" "}
            <a className="text-link" onClick={navigateToPhoto}>
              PHOTOS
            </a>
            ,{" "}
            <a className="text-link" onClick={navigateToSoftware}>
              SOFTWARE
            </a>
          </TitleBar>
          <button
            className={`absolute bottom-10 left-1/2 ${
              atTopOfPage ? "animate-fadeIn" : "animate-fadeOut opacity-0"
            }`}
            onClick={() =>
              infoRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <FiArrowDownCircle className="w-20 h-20 text-white animate-bounce" />
          </button>
        </div>
        <div
          ref={infoRef}
          className="flex w-screen h-screen overflow-hidden items-center snap-center snap-always"
        />
      </div>
      <NavigationBar show={showNavBar} hide={hideNavBar} />
    </>
  );
};

export default IndexPage;
