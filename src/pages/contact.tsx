import { useState } from 'react';
import { BiLogoGithub, BiLogoInstagram, BiLogoYoutube } from 'react-icons/bi';

import Background from '../components/background';
import ContentWrapper from '../components/content-wrapper';
import NavigationBar from '../components/navigation-bar';
import { usePageLoadTypeStore } from '../hooks/use-store';
import Account from '../components/contact/account';
import Heading from '../components/contact/heading';

const ContactsPage = () => {
  const { playPageFullLoad } = usePageLoadTypeStore();
  const [unload, setUnload] = useState(false);

  const handleNavigate = () => {
    setUnload(true);
  };

  //   background-color: #ffffff;
  // opacity: 0.8;
  // background-image:  radial-gradient(#000000 0.8500000000000001px, transparent 0.8500000000000001px), radial-gradient(#000000 0.8500000000000001px, #ffffff 0.8500000000000001px);
  // background-size: 34px 34px;
  // background-position: 0 0,17px 17px;

  return (
    <>
      <Background>
        <ContentWrapper
          unload={unload}
          className="overflow-y-auto items-center md:justify-center"
          backgroundStyle={{
            backgroundImage: `radial-gradient(#FFFFFF 0.8500000000000001px, transparent 0.8500000000000001px), radial-gradient(#FFFFFF 0.8500000000000001px, #000000 0.8500000000000001px)`,
            backgroundSize: '34px 34px',
            backgroundPosition: '0 0,17px 17px',
          }}
        >
          <div className="fixed top-0 left-0 w-screen h-screen bg-gradient" />
          <div className="flex flex-col  justify-center items-center -sm:items-start max-w-lg flex-grow-0 z-10">
            <div className="flex flex-col items-center m-6">
              <h1 className="font-heading font-bold text-xl">
                PLATFORMS & CONTACT
              </h1>
              <p className="text-center -sm:text-left">
                Here’s the various platforms I can be found on. If you need to
                get in contact, you can always send me a email at{' '}
                <a href="mailto:matt@versiongamma.com" className="text-link">
                  matt@versiongamma.com
                </a>
              </p>
            </div>
            <div className="m-4">
              <Heading name="YouTube" Icon={BiLogoYoutube} />
              <span className="flex flex-row mb-4">
                <Account
                  name="Version Gamma"
                  link="https://youtube.com/c/VersionGamma"
                  icon="/static/vgamma.webp"
                />
                <Account
                  name="Matt Elley"
                  link="https://www.youtube.com/channel/UCNE6kSEJSLk9zZA5lApUg4w"
                  icon="/static/me.webp"
                />
              </span>
              <hr className="my-4 border-white/30" />
              <Heading name="Instagram" Icon={BiLogoInstagram} />
              <span className="flex flex-row mb-4">
                <Account
                  name="matthewsphotosnz"
                  link="https://instagram.com/matthewsphotosnz"
                  icon="/static/me.webp"
                />
              </span>
              <hr className="my-4 border-white/30" />
              <Heading name="GitHub" Icon={BiLogoGithub} />
              <span className="flex flex-row mb-4">
                <Account
                  name="versiongamma"
                  link="https://github.com/versiongamma"
                  icon="https://avatars.githubusercontent.com/u/37131904?v=4"
                />
              </span>
            </div>
          </div>
        </ContentWrapper>
      </Background>
      <NavigationBar
        shown
        enterImmediately={!playPageFullLoad}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default ContactsPage;
