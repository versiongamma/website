import { useCallback, useEffect, useState } from "react";
import { RenderImageProps } from "react-photo-gallery";
import NoSSR from "react-no-ssr";

import {
  ImgurApiResponse,
  PhotosResponse,
} from "../../api/routes/photos/types";
import axios from "../../axios";
import { didPhotosRequestSucceed } from "../../api/routes/photos/utils";
import ReactPhotoGallery, { PhotoClickHandler } from "react-photo-gallery";
import Overlay from "./overlay";
import Image from "./image";
import Loading from "./loading";
import useFadeIn from "../../hooks/use-fade";
import { animated } from "@react-spring/web";

const GET_IMAGES_URL = "/api/photos";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [photos, setPhotos] = useState<ImgurApiResponse | null>(null);

  const ImageRender = useCallback(
    (props: RenderImageProps) => <Image {...props} />,
    []
  );

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

  const [style] = useFadeIn(!!photosForGallery);

  if (!photosForGallery) {
    return null;
  }

  const handlePhotoClick: PhotoClickHandler = (_event, photos) => {
    const { index } = photos;
    setSelectedImageIndex(index);
  };

  const handleNext = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setSelectedImageIndex((index) => {
      if (index === null) {
        return null;
      }

      if (index >= photosForGallery.length - 1) {
        return 0;
      }

      return index + 1;
    });
  };

  const handlePrevious = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setSelectedImageIndex((index) => {
      if (index === null) {
        return null;
      }

      if (index === 0) {
        return photosForGallery.length - 1;
      }

      return index - 1;
    });
  };

  const handleClickAway = () => {
    return setSelectedImageIndex(null);
  };

  const selectedPhotoSrc =
    selectedImageIndex !== null
      ? photosForGallery[selectedImageIndex].src
      : null;

  return (
    <NoSSR>
      <animated.div style={style}>
        <ReactPhotoGallery
          photos={photosForGallery}
          onClick={handlePhotoClick}
          renderImage={ImageRender}
        />
        <Overlay
          src={selectedPhotoSrc}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClickAway={handleClickAway}
        />
      </animated.div>
    </NoSSR>
  );
};

export default Gallery;
