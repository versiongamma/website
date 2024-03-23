import { useEffect, useMemo, useState } from 'react';
import NoSSR from 'react-no-ssr';

import {
  VideoResponse,
  YoutubeApiPlaylistResponse,
} from '../api/routes/video/types';
import { didVideoRequestSucceed } from '../api/routes/video/utils';
import axios from '../axios';
import Background from '../components/background';
import ContentWrapper from '../components/content-wrapper';
import NavigationBar from '../components/navigation-bar';
import { usePageLoadTypeStore } from '../hooks/use-store';
import useWaitForImgLoad from '../hooks/use-wait-for-img-load';
import { gradient } from '../theme';
import VideoList from '../components/video/list';

const GET_ANALYSIS_VIDEOS_URL = '/api/videos/analysis';
const GET_VIDEOGRAPHY_VIDEOS_URL = '/api/videos/videography';
const BACKGROUND_IMAGES = [
  {
    url: '/static/video-bg.webp',
    style: {
      background: `${gradient},url("/static/video-bg.webp")`,
      backgroundPosition: 'left',
      backgroundSize: 'cover',
    },
  },
  {
    url: '/static/video-bg-2.webp',
    style: {
      background: `${gradient},url("/static/video-bg-2.webp")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
  },
  {
    url: '/static/video-bg-3.webp',
    style: {
      background: `${gradient},url("/static/video-bg-3.webp")`,
      backgroundPosition: '52% 50%',
      backgroundSize: 'cover',
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

  const [analysisVideos, setAnalysisVideos] =
    useState<YoutubeApiPlaylistResponse | null>(null);
  const [videographyVideos, setVideographyVideos] =
    useState<YoutubeApiPlaylistResponse | null>(null);

  // TODO: add error handling to response
  useEffect(() => {
    axios.get<VideoResponse>(GET_ANALYSIS_VIDEOS_URL).then((res) => {
      if (didVideoRequestSucceed(res.data)) {
        setAnalysisVideos(res.data.data);
        return;
      }
    });

    axios.get<VideoResponse>(GET_VIDEOGRAPHY_VIDEOS_URL).then((res) => {
      if (didVideoRequestSucceed(res.data)) {
        setVideographyVideos(res.data.data);
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
          <NoSSR>
            <div className="flex justify-between w-full pt-10 pb-2 px-10 font-bold font-heading -md:hidden">
              <h1>
                <span className="text-2xl 2xl:text-4xl -xl:hidden">
                  VIDEO GAME & MEDIA ANALYSIS
                </span>
                <span className="xl:hidden text-2xl">ANALYSIS</span>
              </h1>
              <h1>
                <span className="text-2xl 2xl:text-4xl -xl:hidden">
                  VIDEOGRAPHY (MUSIC VIDEOS, SHORTS, CAMERA TESTS)
                </span>
                <span className="xl:hidden text-2xl">VIDEOGRAPHY</span>
              </h1>
            </div>
            {/*  Desktop View */}
            <div className="flex w-full h-full overflow-y-auto -md:hidden">
              <VideoList videos={analysisVideos} />
              <VideoList videos={videographyVideos} />
            </div>
            {/*  Mobile View */}
            <div className="flex justify-center w-full h-full overflow-y-auto md:hidden">
              <VideoList
                videos={
                  analysisVideos && videographyVideos
                    ? {
                        items: [
                          ...analysisVideos.items,
                          ...videographyVideos.items,
                        ],
                      }
                    : null
                }
              />
            </div>
          </NoSSR>
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
