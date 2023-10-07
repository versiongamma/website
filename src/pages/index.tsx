import { useEffect, useRef, useState } from "react";
import { useNavigate as useReactRouterNavigate } from "react-router-dom";

import ContentWrapper from "../components/content-wrapper";
import ImageBackground from "../components/index/image-background";
import InfoPageContents from "../components/index/info-page-contents";
import ScrollDownIndicator from "../components/index/scroll-down-indicator";
import NavigationBar from "../components/navigation-bar";
import TitleBar from "../components/title-bar";
import useNavigate from "../hooks/use-navigate";
import { usePageLoadTypeStore } from "../hooks/use-store";
import useViewport from "../hooks/use-viewport";
import { applyConditionalStyle } from "../utils/apply";
import Loading from "../components/index/loading";

const MOCK_LOAD_TIME = 2000;

type Props = {
  info?: boolean;
};

const IndexPage = ({ info }: Props) => {
  const [waitingOnInitialLoad, setWaitingOnInitialLoad] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [navBarHasAppeared, setNavBarHasAppeared] = useState(false);

  const navigate = useReactRouterNavigate();
  const onInfoPage = !!info;

  const { playPageFullLoad, setPageToFullLoad } = usePageLoadTypeStore();

  const handleNavigate = () => {
    setLoaded(false);
  };

  const [navigateToVideo] = useNavigate("/video", 500, [handleNavigate]);
  const [navigateToPhoto] = useNavigate("/photo", 500, [handleNavigate]);
  const [navigateToSoftware] = useNavigate("/software", 500, [handleNavigate]);

  const topRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { height: viewportHeight } = useViewport();

  useEffect(() => {
    if (onInfoPage) {
      setLoaded(true);
      setWaitingOnInitialLoad(false);
      infoRef.current?.scrollIntoView({ behavior: "instant" });
      return;
    }

    setTimeout(() => {
      setLoaded(true);
      setWaitingOnInitialLoad(false);
      setShowScrollIndicator(true);
    }, MOCK_LOAD_TIME);
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const position = event.currentTarget.scrollTop;

    if (position === viewportHeight) {
      navigate("/info");
      setNavBarHasAppeared(true);
      setShowNavBar(true);
    }
    if (position === 0) {
      navigate("/");
      setShowScrollIndicator(true);
    }

    // Scrolling up from '/info' to '/'
    if (onInfoPage && position < viewportHeight) {
      if (!playPageFullLoad) {
        setPageToFullLoad();
      }

      setShowNavBar(false);
    }

    // Scrolling down from '/' top '/info'
    if (!onInfoPage && position > 0) {
      setShowScrollIndicator(false);
    }
  };

  return (
    <>
      <div>
        <Loading unload={loaded} hide={onInfoPage} />
      </div>
      <div
        // The opacity needs to be set directly on the html, as the css file
        // is loaded only after the html file is loaded, and hence some things can be
        // displayed when they're not supposed to
        style={{ opacity: loaded ? 1 : 0 }}
        className={`snap-y snap-mandatory snap w-screen h-screen ${applyConditionalStyle(
          loaded,
          "overflow-y-auto",
          "overflow-y-hidden"
        )}`}
        onScroll={handleScroll}
        ref={topRef}
      >
        <ImageBackground
          shown={loaded}
          unload={!loaded && !waitingOnInitialLoad}
        >
          <TitleBar shown={loaded} hide={waitingOnInitialLoad}>
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
        </ImageBackground>
        <ScrollDownIndicator
          shown={showScrollIndicator}
          hide={waitingOnInitialLoad}
          scrollElementRef={infoRef}
        />
        <div
          ref={infoRef}
          className="flex w-screen h-screen overflow-hidden items-center snap-center snap-always background-gradient"
        >
          <ContentWrapper
            unload={!loaded}
            className="flex justify-center w-screen"
          >
            <InfoPageContents />
          </ContentWrapper>
        </div>
      </div>
      <NavigationBar
        shown={showNavBar}
        hide={!navBarHasAppeared || !info}
        handleNavigate={handleNavigate}
        enterImmediately={!playPageFullLoad}
      />
    </>
  );
};

export default IndexPage;
