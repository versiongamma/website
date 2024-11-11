import {
  SiTypescript,
  SiNodedotjs,
  SiReact,
  SiAmazonaws,
  SiPhp,
  SiFastify,
  SiGithub,
  SiTerraform,
} from 'react-icons/si';

import ProjectView from '../project-view';

const Fergus = () => (
  <ProjectView
    direction="right"
    logo={
      <img
        src="https://fergus.com/hubfs/Logo%20files/fergus-horizontal-white@2x.png"
        width={256}
      />
    }
    copy="My current gig is at Fergus, a company that creates job management software for Tradies (Electrician/Plumber types for those of you unfamiliar with the AUNZ slang). 
    I currently work on the integrations team, developing solutions to connect other software tradies might use to our product, ranging from ingesting supplier price book and invoice documents
    to 2 way syncing with various accounting software (such as Xero, MYOB and Quickbooks) using their various APIs. We've also developed an in house public facing API for use by our partners
    to fetch and ingest data from and into our systems"
    icons={[
      SiTypescript,
      SiPhp,
      SiNodedotjs,
      SiFastify,
      SiReact,
      SiAmazonaws,
      SiGithub,
      SiTerraform,
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
    previewImgSrc="https://fergus.com/hubfs/NZ-Hero.png"
  />
);

export default Fergus;
