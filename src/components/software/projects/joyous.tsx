import {
  SiTypescript,
  SiApollographql,
  SiNodedotjs,
  SiReact,
  SiAmazonaws,
} from "react-icons/si";

import ProjectView from "../project-view";

const Joyous = () => (
  <ProjectView
    direction="left"
    logo={
      <img
        src="https://global-uploads.webflow.com/64829840cad0995d3a214e8c/648baaca78d727002d78fd58_Joyous-colour.svg"
        width={256}
      />
    }
    copy="Joyous (the product) is an enterprise Employee to Employer feedback software. I worked at Joyous (the company)
     for 2 years as a software engineer, working across the tech stack from frontend React, backend NodeJS & GraphQL, 
     and DevOps with AWS and Pulumi."
    icons={[SiAmazonaws, SiNodedotjs, SiApollographql, SiReact, SiTypescript]}
    link={
      <a
        className="text-link text-lg 2xl:text-2xl"
        href="https://joyoushq.com"
        target="_blank"
      >
        joyoushq.com
      </a>
    }
    previewImgSrc="https://global-uploads.webflow.com/64829840cad0995d3a214e8c/64c9d4219f054936c64bad83_product-ui-dashboard-trans-healthcare.png"
  />
);

export default Joyous;
