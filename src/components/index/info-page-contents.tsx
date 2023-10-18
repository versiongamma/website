import { useEffect, useState } from 'react';
import { BiLogoGithub, BiLogoInstagram, BiLogoYoutube } from 'react-icons/bi';

import { ChannelStats, SubscriberResponse } from '../../api/routes/video/types';
import { didSubscriberRequestSucceed } from '../../api/routes/video/utils';
import axios from '../../axios';

const GET_SUBSCRIBERS_URL = 'api/videos/versiongamma/subscribers';
const ICON_STYLE = 'w-[32px] h-[32px] 2xl:w-[64px] 2xl:h-[64px]';
const LINK_STYLE =
  'hover-bg p-1 rounded-full w-[48px] h-[48px] flex items-center justify-center m-1 2xl:m-2';

const getFormattedNumber = (x?: number) =>
  x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 'some';

const SocialLinks = () => (
  <div className="flex flex-col items-center z-10">
    <p className="font-mono text-xs 2xl:text-xl m-2">YOU CAN FIND ME AT</p>
    <div className="flex xl:flex-col flex-row items-center justify-center w-[200px] 2xl:w-[300px]">
      <a
        className={LINK_STYLE}
        href="https://youtube.com/c/VersionGamma"
        target="_blank"
        rel="noreferrer"
      >
        <BiLogoYoutube className={ICON_STYLE} />
      </a>
      <a
        className={LINK_STYLE}
        href="https://github.com/versiongamma"
        target="_blank"
        rel="noreferrer"
      >
        <BiLogoGithub className={ICON_STYLE} />
      </a>
      <a
        className={LINK_STYLE}
        href="https://instagram.com/matthewsphotosnz"
        target="_blank"
        rel="noreferrer"
      >
        <BiLogoInstagram className={ICON_STYLE} />
      </a>
    </div>
  </div>
);

const InfoPageContents = () => {
  const [statistics, setStatistics] = useState<ChannelStats | null>(null);

  // TODO: add error handling to fetch
  useEffect(() => {
    axios.get<SubscriberResponse>(GET_SUBSCRIBERS_URL).then((res) => {
      if (didSubscriberRequestSucceed(res.data)) {
        setStatistics(res.data.data.items[0].statistics);
        return;
      }
    });
  }, []);

  const { viewCount, subscriberCount } = statistics ?? {};

  return (
    <>
      <div
        className="flex xl:flex-row flex-col justify-center -lg:h-full -lg:max-w-[600px] lg:w-[700px] xl:w-[1300px] 2xl:w-[1500px] 
    space-y-3 lg:space-y-10 xl:space-x-20 "
      >
        <span className="flex items-center xl:justify-end justify-center min-w-[300px]">
          <img
            src="/static/me.webp"
            className="max-w-[150px] lg:max-w-[200px] 2xl:max-w-[350px] self-center rounded-full"
          />
        </span>
        <span className="space-y-4 2xl:text-2xl lg:flex-grow -lg:m-2">
          <p className="-lg:hidden">
            So you want to know more about who am I then, other than just a
            “maker of stuff”. Fair enough.
          </p>

          <p className="-lg:text-center">
            <span className="lg:hidden">
              Hi! I’m Matt, and I make a bunch of stuff.{' '}
            </span>
            Most notably, I’m a software developer. The majority of my
            experience is in web dev with TypeScript, React & NodeJS, but I’ve
            worked outside the web as well, mostly in the various suffixes of C.
            (Thats <span className="font-mono">++</span> and{' '}
            <span className="font-mono">#</span> for the uninitiated)
          </p>
          <p className="-lg:text-center">
            I also make videos for YouTube under the channel Version Gamma. I
            mostly discuss game design, although I occasionally branch out into
            other topics I’m passionate about. Apparently{' '}
            {getFormattedNumber(viewCount)} people have decided to click on one
            of my videos, and {getFormattedNumber(subscriberCount)} chose to
            stick around, so there’s that.
          </p>
          <p className="md:hidden text-center">
            I’m also a photographer and videographer. A lot of the work I’ve
            done is on this site, so feel free to have a look around!
          </p>
          <p className="-md:hidden -lg:text-center">
            You might also notice I’m a little bit of an appreciator of things
            involving cameras, from the personal photography I do, to the
            videography that goes into the videos I produce. It’s been a hobby
            of mine for many years, and I use it as an excuse to visit
            interesting and beautiful places, which we have in great abundance
            here in my home of Aotearoa.
          </p>
        </span>
        <span className="flex items-center justify-center xl:justify-start min-w-[300px] -vmd:hidden">
          <SocialLinks />
        </span>
      </div>
    </>
  );
};

export default InfoPageContents;
