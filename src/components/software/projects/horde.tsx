import { SiCplusplus, SiFmod, SiOpengl } from 'react-icons/si';

import ProjectView from '../project-view';

const Horde = () => (
  <ProjectView
    direction="right"
    title="Horde"
    copy="Horde is a round based survival twin stick shooter. It's not a very complex game, but everything was developed
    from scratch (well, I didn't hand develop OpenGL, but you know what I mean. I didn't use a game engine)."
    icons={[SiCplusplus, SiOpengl, SiFmod]}
    link={
      <a
        className="text-link text-lg 2xl:text-2xl"
        href="https://github.com/versiongamma/horde"
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub
      </a>
    }
    previewImgSrc="/static/horde-debug.webp"
  />
);

export default Horde;
