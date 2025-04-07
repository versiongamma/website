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
          <div className="w-full h-full flex items-center justify-center">
          <h1 className='font-heading text-2xl text-center'>This page is currently down for maintenance <br />until I find a new image host</h1>
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
