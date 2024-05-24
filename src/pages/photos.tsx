import { useState } from 'react';

import Background from '../components/background';
import ContentWrapper from '../components/content-wrapper';
import NavigationBar from '../components/navigation-bar';
import { usePageLoadTypeStore } from '../hooks/use-store';
import useWaitForImgLoad from '../hooks/use-wait-for-img-load';
import { gradient } from '../theme';
import Gallery from '../components/photos/gallery';

const BACKGROUND_IMAGE_URL = '/static/photos-bg.webp';

const PhotosPage = () => {
  const { playPageFullLoad } = usePageLoadTypeStore();
  const [unload, setUnload] = useState(false);

  const backgroundImageLoaded = useWaitForImgLoad('/static/photos-bg.webp');

  const handleNavigate = () => {
    setUnload(true);
  };

  return (
    <>
      <Background>
        <ContentWrapper
          unload={unload || !backgroundImageLoaded}
          backgroundStyle={{
            background: `${gradient},url("${BACKGROUND_IMAGE_URL}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          className="overflow-y-auto"
        >
          {/* <Gallery /> */}
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-2xl">
              The gallery is currently unavailable. You can thank{' '}
              <a href="https://cyclic.sh">cyclic.sh</a> for shutting down
              without telling me for that 😠
            </h1>
          </div>
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

export default PhotosPage;
