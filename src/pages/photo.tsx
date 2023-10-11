import { useEffect, useState } from "react";

import { gradient } from "../theme";
import { usePageLoadTypeStore } from "../hooks/use-store";
import ContentWrapper from "../components/content-wrapper";
import NavigationBar from "../components/navigation-bar";
import Background from "../components/background";
import useWaitForImgLoad from "../hooks/use-wait-for-img-load";

const BACKGROUND_IMAGE_URL = "/static/photos-bg.webp";

const PhotoPage = () => {
  const { playPageFullLoad } = usePageLoadTypeStore();
  const [unload, setUnload] = useState(false);
  const backgroundImageLoaded = useWaitForImgLoad("/static/photos-bg.webp");

  const handleNavigate = () => {
    setUnload(true);
  };

  return (
    <>
      <Background>
        <ContentWrapper
          unload={unload || !backgroundImageLoaded}
          hide={!backgroundImageLoaded}
          className="flex flex-col items-center justify-center"
          backgroundStyle={{
            background: `${gradient},url("${BACKGROUND_IMAGE_URL}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="font-bold font-heading text-4xl animate-slideIn text-white">
            PHOTOS
          </h1>
          <p className="text-white">Photos coming soon...</p>
        </ContentWrapper>
      </Background>
      <NavigationBar
        shown
        enterImmediately={!playPageFullLoad}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default PhotoPage;
