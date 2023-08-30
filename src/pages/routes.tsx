import IndexPage from ".";
import PhotoPage from "./photo";
import SoftwarePage from "./software";
import VideoPage from "./video";

export const routes = [
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/video",
    element: <VideoPage />,
  },
  {
    path: "/photo",
    element: <PhotoPage />,
  },
  {
    path: "/software",
    element: <SoftwarePage />,
  },
];
