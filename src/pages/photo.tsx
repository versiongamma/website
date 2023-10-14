import { useEffect, useState } from "react";
import axios from "axios";

import { ImgurApiResponse, PhotosResponse } from "../api/routes/photos/types";
import { didPhotosRequestSucceed } from "../api/routes/photos/utils";
import Background from "../components/background";
import ContentWrapper from "../components/content-wrapper";
import NavigationBar from "../components/navigation-bar";
import { usePageLoadTypeStore } from "../hooks/use-store";
import useWaitForImgLoad from "../hooks/use-wait-for-img-load";
import { gradient } from "../theme";
import Gallery, { RenderImageProps } from "react-photo-gallery";
import Overlay from "../components/photos/overlay";

const BACKGROUND_IMAGE_URL = "/static/photos-bg.webp";
const GET_IMAGES_URL = "/api/photos";

const PhotoPage = () => {
  const { playPageFullLoad } = usePageLoadTypeStore();
  const [unload, setUnload] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const backgroundImageLoaded = useWaitForImgLoad("/static/photos-bg.webp");

  const [photos, setPhotos] = useState<ImgurApiResponse | null>(null);

  useEffect(() => {
    axios.get<PhotosResponse>(GET_IMAGES_URL).then((res) => {
      if (didPhotosRequestSucceed(res.data)) {
        setPhotos(res.data.data);
        return;
      }
    });
  }, []);

  const photosForGallery =
    photos?.images.map(({ link, ...photo }) => ({
      src: link,
      ...photo,
    })) ?? null;

  const handlePhotoClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    photos: {
      index: number;
    }
  ) => {
    if (photosForGallery) {
      setSelectedImage(photosForGallery[photos.index]?.src);
    }
  };

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
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="overflow-y-auto"
        >
          {photosForGallery && (
            <Gallery photos={photosForGallery} onClick={handlePhotoClick} />
          )}
          <Overlay src={selectedImage} />
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
