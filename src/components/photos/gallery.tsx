import { animated } from '@react-spring/web';
import { useCallback, useEffect, useState } from 'react';
import NoSSR from 'react-no-ssr';
import { RenderImageProps } from 'react-photo-gallery';

import ReactPhotoGallery, { PhotoClickHandler } from 'react-photo-gallery';
import {
  Image as ApiImage,
  PhotosResponse,
} from '../../api/routes/photos/types';
import { didPhotosRequestSucceed } from '../../api/routes/photos/utils';
import axios from '../../axios';
import useFadeIn from '../../hooks/use-fade';
import Image from './image';
import Overlay from './overlay';

const GET_IMAGES_URL = '/api/photos';

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [photos, setPhotos] = useState<ApiImage[] | null>(null);

  const ImageRender = useCallback(
    (props: RenderImageProps) => <Image {...props} />,
    []
  );

  useEffect(() => {
    axios.get<PhotosResponse>(GET_IMAGES_URL).then((res) => {
      if (didPhotosRequestSucceed(res.data)) {
        const shuffled = res.data.data
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
        setPhotos(shuffled);

        return;
      }
    });
  }, []);

  const [style] = useFadeIn(!!photos);

  if (!photos) {
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

      if (index >= photos.length - 1) {
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
        return photos.length - 1;
      }

      return index - 1;
    });
  };

  const handleClickAway = () => {
    return setSelectedImageIndex(null);
  };

  const selectedPhotoSrc =
    selectedImageIndex !== null
      ? photos[selectedImageIndex].src
      : null;

  return (
    <NoSSR>
      <animated.div style={style}>
        <ReactPhotoGallery
          photos={photos}
          onClick={handlePhotoClick}
          renderImage={ImageRender}
        />
        <Overlay
          allSrcs={photos.map(({ src }) => src)}
          selectedSrc={selectedPhotoSrc}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClickAway={handleClickAway}
        />
      </animated.div>
    </NoSSR>
  );
};

export default Gallery;

