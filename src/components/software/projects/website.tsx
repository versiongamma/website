import {
  SiReact,
  SiExpress,
  SiReactrouter,
  SiTailwindcss,
} from 'react-icons/si';

import ProjectView from '../project-view';

const Website = () => (
  <ProjectView
    direction="left"
    title="Website"
    copy="This website itself is a bit of a project. I mostly work with dynamic web apps, so this website
    was a chance to work on more static web content. While all you might see is the finished site, the server that's
    serving you all this content is a complete custom solution using Express and React Server Side Rendering"
    icons={[SiReactrouter, SiTailwindcss, SiExpress, SiReact]}
    link={
      <a
        className="text-link text-lg 2xl:text-2xl"
        href="https://github.com/versiongamma/website"
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub
      </a>
    }
    previewImgSrc="/static/website.webp"
  />
);

export default Website;
