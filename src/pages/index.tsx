import { useEffect, useRef, useState } from 'react';
import { useNavigate as useReactRouterNavigate } from 'react-router-dom';

import ContentWrapper from '../components/content-wrapper';
import ImageBackground from '../components/index/image-background';
import InfoPageContents from '../components/index/info-page-contents';
import ScrollDownIndicator from '../components/index/scroll-down-indicator';
import NavigationBar from '../components/navigation-bar';
import TitleBar from '../components/title-bar';
import useNavigate from '../hooks/use-navigate';
import { usePageLoadTypeStore } from '../hooks/use-store';
import useViewport from '../hooks/use-viewport';
import { applyConditionalStyle } from '../utils/apply';
import Loading from '../components/index/loading';
import CallToAction from '../components/index/call-to-action';
import { breakpoints } from '../theme';

type Props = {
  info?: boolean;
};

const IndexPage = ({ info }: Props) => {
  const onInfoPage = !!info;

  const [waitingOnInitialLoad, setWaitingOnInitialLoad] = useState(true);
  const [loaded, setLoaded] = useState(onInfoPage);
  const [unload, setUnload] = useState(!onInfoPage);
  const [showNavBar, setShowNavBar] = useState(onInfoPage);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [navBarHasAppeared, setNavBarHasAppeared] = useState(onInfoPage);

  const navigate = useReactRouterNavigate();

  const { playPageFullLoad, setPageToFullLoad } = usePageLoadTypeStore();

  const handleNavigate = () => {
    setUnload(true);
  };

  const [navigateToVideo] = useNavigate('/video', 500, [handleNavigate]);
  const [navigateToPhoto] = useNavigate('/photos', 500, [handleNavigate]);
  const [navigateToSoftware] = useNavigate('/software', 500, [handleNavigate]);

  const topRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { width: viewportWidth, height: viewportHeight } = useViewport();

  const hideIntroPage = viewportWidth <= breakpoints.md;

  useEffect(() => {
    setLoaded(true);
    setUnload(false);

    if (onInfoPage || hideIntroPage) {
      setWaitingOnInitialLoad(false);
      infoRef.current?.scrollIntoView({ behavior: 'instant' });
      return;
    }

    setWaitingOnInitialLoad(false);
    setShowScrollIndicator(true);
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const position = event.currentTarget.scrollTop;

    if (position === viewportHeight) {
      navigate('/info');
      setNavBarHasAppeared(true);
      setShowNavBar(true);
    }
    if (position === 0) {
      navigate('/');
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
      <Loading unload={!unload} hide={onInfoPage} />
      <div
        // The opacity needs to be set directly on the html, as the css file
        // is loaded only after the html file is loaded, and hence some things can be
        // displayed when they're not supposed to
        style={{ opacity: loaded ? 1 : 0 }}
        className={`snap-y snap-mandatory snap w-screen h-screen ${applyConditionalStyle(
          loaded && !hideIntroPage,
          'overflow-y-auto',
          'overflow-y-hidden'
        )}`}
        onScroll={handleScroll}
        ref={topRef}
      >
        <ImageBackground
          shown={!unload}
          unload={unload && !waitingOnInitialLoad}
        >
          <TitleBar shown={!unload} hide={waitingOnInitialLoad}>
            <a
              className="hover:text-orange-300 transition-colors cursor-pointer"
              onClick={navigateToVideo}
            >
              VIDEOS
            </a>
            ,{' '}
            <a
              className="hover:text-orange-300 transition-colors cursor-pointer"
              onClick={navigateToPhoto}
            >
              PHOTOS
            </a>
            ,{' '}
            <a
              className="hover:text-orange-300 transition-colors cursor-pointer"
              onClick={navigateToSoftware}
            >
              SOFTWARE
            </a>
          </TitleBar>
        </ImageBackground>
        <ScrollDownIndicator
          shown={showScrollIndicator && !unload}
          hide={waitingOnInitialLoad}
          scrollElementRef={infoRef}
        />
        <div
          ref={infoRef}
          className="flex w-screen h-screen overflow-hidden items-center snap-center snap-always background-gradient"
        >
          <ContentWrapper
            unload={unload}
            className="flex items-center justify-center w-screen"
          >
            <InfoPageContents />
            <CallToAction shown={showNavBar} hide={false} />
          </ContentWrapper>
        </div>
      </div>
      <NavigationBar
        shown={showNavBar}
        hide={!navBarHasAppeared || !onInfoPage}
        handleNavigate={handleNavigate}
        enterImmediately={!playPageFullLoad}
      />
    </>
  );
};

export default IndexPage;
