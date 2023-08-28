import Index from ".";
import Videos from "./videos";

export const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/video",
    element: <Videos />,
  },
];
