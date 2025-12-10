import {
  SiAmazonapigateway,
  SiAmazons3,
  SiDocker,
  SiFastify,
  SiGithubactions,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';

import ProjectView from '../project-view';

const Fergus = () => (
  <ProjectView
    direction="right"
    logo={
      <img
        src="https://fergus.com/wp-content/uploads/2023/11/fergus-nav-logo.webp"
        width={256}
      />
    }
    copy="My current gig is at Fergus, a company that creates job management software for Tradies. 
    Currently I work on improving our core product, creating new features for both our web app and our React Native mobile app. I also previously worked on the integrations team, developing solutions to connect other software tradies might use to our product, ranging from ingesting supplier price book and invoice documents
    to 2 way syncing with various accounting software (such as Xero, MYOB and Quickbooks) using their various APIs. We've also developed an in house public facing API for use by our partners
    to fetch and ingest data from and into our systems"
    icons={[
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: SiPhp, name: 'PHP' },
      { icon: SiNodedotjs, name: 'NodeJS' },
      { icon: SiFastify, name: 'Fastify' },
      { icon: SiReact, name: 'React' },
      { icon: SiAmazons3, name: 'AWS S3' },
      { icon: SiAmazonapigateway, name: 'AWS API Gateway' },
      { icon: SiGithubactions, name: 'Github Actions' },
      { icon: SiTerraform, name: 'Terraform' },
      { icon: SiDocker, name: 'Docker' },
    ]}
    link={
      <a
        className="text-link text-lg 2xl:text-2xl"
        href="https://fergus.com"
        target="_blank"
        rel="noreferrer"
      >
        fergus.com
      </a>
    }
    previewImgSrc="https://fergus.com/wp-content/uploads/2025/10/Group-4.png"
  />
);

export default Fergus;
