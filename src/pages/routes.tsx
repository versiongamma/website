import IndexPage from ".";
import PhotoPage from "./photo";
import SoftwarePage from "./software";
import VideoPage from "./video";

export const routes = [
  {
    path: "/",
    element: <IndexPage />,
  },
  { path: "/info", element: <IndexPage info /> },
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

export const PATHNAME_TO_INFO_MAP: Record<
  string,
  { indicatorPosition: number }
> = {
  "/": {
    indicatorPosition: -92,
  },
  "/info": {
    indicatorPosition: -92,
  },
  "/video": {
    indicatorPosition: -24,
  },
  "/photo": {
    indicatorPosition: 44,
  },
  "/software": {
    indicatorPosition: 112,
  },
};