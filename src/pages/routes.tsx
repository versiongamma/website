import IndexPage from '.';
import ContactPage from './contact';
import PhotosPage from './photos';
import SoftwarePage from './software';
import VideoPage from './video';

export const routes = [
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/info',
    element: <IndexPage info />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/video',
    element: <VideoPage />,
  },
  {
    path: '/photos',
    element: <PhotosPage />,
  },
  {
    path: '/software',
    element: <SoftwarePage />,
  },
];

export const PATHNAME_TO_INFO_MAP: Record<
  string,
  { indicatorPosition: number }
> = {
  '/': {
    indicatorPosition: -126,
  },
  '/info': {
    indicatorPosition: -126,
  },
  '/contact': {
    indicatorPosition: -58,
  },
  '/video': {
    indicatorPosition: 8,
  },
  '/photos': {
    indicatorPosition: 78,
  },
  '/software': {
    indicatorPosition: 146,
  },
};
