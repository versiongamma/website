import { useEffect, useRef, useState } from "react";
import { BiCodeAlt } from "react-icons/bi";
import { FiArrowDownCircle, FiCamera, FiYoutube } from "react-icons/fi";

import NavigationBar from "../components/navigation-bar";
import TitleBar from "../components/title-bar";
import useAnimate from "../hooks/use-animate";
import useNavigate from "../hooks/use-navigate";
import { usePageLoadTypeStore } from "../hooks/use-store";
import useViewport from "../hooks/use-viewport";
import { applyConditionalStyle } from "../utils/apply";

const TEST_LOAD_TIME = 0;

const IndexPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [unload, setUnloaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [navBarHasAppeared, setNavBarHasAppeared] = useState(false);
  const { setPageToFullLoad, setPageToContentLoad } = usePageLoadTypeStore();

  const handleNavigate = () => setUnloaded(true);

  const [navigateToVideo] = useNavigate("/video", 500, [handleNavigate]);
  const [navigateToPhoto] = useNavigate("/photo", 500, [handleNavigate]);
  const [navigateToSoftware] = useNavigate("/software", 500, [handleNavigate]);

  const infoRef = useRef<HTMLDivElement>(null);
  const { height: viewportHeight } = useViewport();

  useEffect(() => {
    setPageToFullLoad();

    setTimeout(() => {
      setLoaded(true);
    }, TEST_LOAD_TIME);
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const position = event.currentTarget.scrollTop;
    setScrollPosition(position);

    if (position >= viewportHeight) {
      setNavBarHasAppeared(true);
      setPageToContentLoad();
    }

    if (position < viewportHeight && navBarHasAppeared) {
      setPageToFullLoad();
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
          <TitleBar shown={loaded} unload={unload}>
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
            {/* <FiArrowDownCircle className="w-20 h-20 text-white animate-bounce" /> */}
          </button>
        </div>

        <div
          ref={infoRef}
          className={`flex w-screen h-screen overflow-hidden items-center snap-center snap-always background-gradient`}
        >
          <div
            className={applyConditionalStyle(
              unload,
              "animate-fadeOut opacity-0"
            )}
          >
            <p>THIS IS SOME CONTENT</p>
          </div>
        </div>
      </div>
      {/* <NavigationBar shown={atBottomOfPage} handleNavigate={handleNavigate} /> */}
    </>
  );
};

export default IndexPage;
