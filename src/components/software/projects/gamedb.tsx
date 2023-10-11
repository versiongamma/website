import {
  SiNextdotjs,
  SiFirebase,
  SiVercel,
  SiTypescript,
  SiReact,
} from "react-icons/si";

import ProjectView from "../project-view";

const GameDB = () => (
  <ProjectView
    direction="right"
    logo={<img className="rounded-xl" src="/static/gamedb.webp" width={64} />}
    title="GameDB"
    copy="GameDB is a website and progressive web app designed to track and document a physical game collection. There
    are great collection trackers for other forms of media (like books or music) but all the solutions for games lacked
    features, usability and a modern design style. So I decided to make on for myself."
    icons={[SiNextdotjs, SiFirebase, SiVercel, SiTypescript, SiReact]}
    link={
      <a
        className="text-link text-lg 2xl:text-2xl"
        href="https://github.com/versiongamma/gamedb"
        target="_blank"
      >
        View on GitHub
      </a>
    }
    previewImgSrc="https://user-images.githubusercontent.com/37131904/261836227-732ffac5-dc0e-4a20-87a0-f5c417191f13.png"
  />
);

export default GameDB;
