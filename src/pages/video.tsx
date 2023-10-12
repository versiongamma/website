import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Background from "../components/background";
import ContentWrapper from "../components/content-wrapper";
import NavigationBar from "../components/navigation-bar";
import { usePageLoadTypeStore } from "../hooks/use-store";
import {
  VideoResponse,
  YoutubeApiPlaylistResponse,
} from "../api/routes/video/types";
import { didVideoRequestSucceed } from "../api/routes/video/utils";
import Thumbnail, { ThumbnailSkeleton } from "../components/video/thumbnail";
import useWaitForImgLoad from "../hooks/use-wait-for-img-load";
import { gradient } from "../theme";

const GET_VIDEOS_URL = "/api/videos/versiongamma";
const THUMBNAIL_SKELETON_COUNT = 20;
const BACKGROUND_IMAGES = [
  {
    url: "/static/video-bg.webp",
    style: {
      background: `${gradient},url("/static/video-bg.webp")`,
      backgroundPosition: "left",
      backgroundSize: "cover",
    },
  },
  {
    url: "/static/video-bg-2.webp",
    style: {
      background: `${gradient},url("/static/video-bg-2.webp")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  {
    url: "/static/video-bg-3.webp",
    style: {
      background: `${gradient},url("/static/video-bg-3.webp")`,
      backgroundPosition: "52% 50%",
      backgroundSize: "cover",
    },
  },
];

const VideoPage = () => {
  const [unload, setUnload] = useState(false);
  const { playPageFullLoad } = usePageLoadTypeStore();

  const backgroundImage = useMemo(
    () => BACKGROUND_IMAGES[Math.floor(Math.random() * 3)],
    []
  );

  const backgroundImageLoaded = useWaitForImgLoad(backgroundImage.url);

  const [videos, setVideos] = useState<YoutubeApiPlaylistResponse | null>(null);

  // TODO: add error handling to response
  useEffect(() => {
    axios.get<VideoResponse>(GET_VIDEOS_URL).then((res) => {
      if (didVideoRequestSucceed(res.data)) {
        setVideos(res.data.data);
        return;
      }
    });
  }, []);

  const handleNavigate = () => {
    setUnload(true);
  };

  return (
    <>
      <Background>
        <ContentWrapper
          unload={unload || !backgroundImageLoaded}
          hide={!backgroundImageLoaded}
          backgroundStyle={backgroundImage.style}
        >
          <span className="flex items-center space-x-2 col-span-full m-2 mt-8">
            <img
              src="/static/vgamma.webp"
              className="rounded-full"
              width={128}
            />
            <p className="font-heading text-white text-2xl font-bold">
              VERSION GAMMA
            </p>
          </span>
          <span className="grid grid-cols-video-thumbnails overflow-y-auto gap-6 justify-center 2xl:grid-cols-video-thumbnails-lg">
            {!videos &&
              [...Array(THUMBNAIL_SKELETON_COUNT)].map((_x, i) => (
                <ThumbnailSkeleton key={i} />
              ))}
            {videos &&
              videos.items.map(
                ({
                  snippet: {
                    title,
                    thumbnails: {
                      maxres: { url },
                    },
                    publishedAt,
                    resourceId: { videoId },
                  },
                }) => (
                  <Thumbnail
                    id={videoId}
                    img={url}
                    title={title}
                    publishedDate={new Date(publishedAt)}
                  />
                )
              )}
          </span>
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

export default VideoPage;
