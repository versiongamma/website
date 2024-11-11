import useWaitForImgLoad from '../../hooks/use-wait-for-img-load';
import { applyConditionalStyle } from '../../utils/apply';
import { IconType } from 'react-icons';
import Skeleton from '../skeleton';

type Direction = 'left' | 'right';

type TechStackIconProps = {
  icons: IconType[];
};

const TechStackIcons = ({ icons }: TechStackIconProps) => (
  <span className="flex space-x-3">
    {icons.map((Icon, index) => (
      <Icon
        key={index}
        className="xl:w-[48px] xl:h-[48px] w-[24px] h-[24px] text-white"
      />
    ))}
  </span>
);

const TITLE_TEXT_STYLE =
  'text-white font-heading xl:text-5xl text-3xl font-semibold pt-2';

type TitleProps = {
  direction: Direction;
  logo?: React.ReactNode;
  title?: string;
};

const Title = ({ direction, logo, title }: TitleProps) => {
  return (
    <span className="flex items-center space-x-2">
      {direction === 'left' ? (
        <>
          {title && <h1 className={TITLE_TEXT_STYLE}>{title}</h1>}
          {logo}
        </>
      ) : (
        <>
          {logo}
          {title && <h1 className={TITLE_TEXT_STYLE}>{title}</h1>}
        </>
      )}
    </span>
  );
};

const DIVIDER_STYLE = 'w-[2px] h-20 bg-slate-200/20 border-none rounded-full';

type HeadingProps = {
  direction: Direction;
} & TitleProps &
  TechStackIconProps;

const Heading = ({ direction, icons, title, logo }: HeadingProps) => (
  <div
    className={`w-full flex items-center space-x-6 ${applyConditionalStyle(
      direction === 'left',
      'justify-end',
      'justify-start'
    )}`}
  >
    {direction === 'left' ? (
      <>
        <TechStackIcons icons={icons} />
        <hr className={DIVIDER_STYLE} />
        <Title direction={direction} logo={logo} title={title} />
      </>
    ) : (
      <>
        <Title direction={direction} logo={logo} title={title} />
        <hr className={DIVIDER_STYLE} />
        <TechStackIcons icons={icons} />
      </>
    )}
  </div>
);

type BodyProps = { copy: string; link: React.ReactNode } & HeadingProps;

const Body = ({ direction, title, logo, icons, copy, link }: BodyProps) => (
  <div
    className={`flex flex-col justify-center w-full h-full space-y-4 ${applyConditionalStyle(
      direction === 'left',
      'items-end',
      'items-start'
    )}`}
  >
    <Heading direction={direction} icons={icons} title={title} logo={logo} />
    <div className="max-w-[600px] 2xl:max-w-[1000px]">
      <p className="text-white 2xl:text-xl">{copy}</p>
    </div>
    {link}
  </div>
);

type PreviewImageProps = {
  direction: Direction;
  previewImgSrc: string;
};

const PreviewImage = ({ direction, previewImgSrc }: PreviewImageProps) => {
  const imageLoaded = useWaitForImgLoad(previewImgSrc);

  if (!imageLoaded) {
    return (
      <Skeleton className="w-[600px] h-[480px] 2xl:w-[800px] 2xl:h-[600px]" />
    );
  }

  return (
    <span
      className={`flex self-center w-full ${applyConditionalStyle(
        direction === 'left',
        'justify-start',
        'justify-end'
      )}`}
    >
      <img className="rounded-xl max-h-[480px] 2xl:max-h-[600px]" src={previewImgSrc} />
    </span>
  );
};

const ProjectView = ({
  direction,
  title,
  logo,
  copy,
  link,
  icons,
  previewImgSrc,
}: BodyProps & PreviewImageProps) => (
  <div
    className={`w-screen flex ${applyConditionalStyle(
      direction === 'left',
      'justify-start',
      'justify-end'
    )}`}
  >
    <div
      className={`flex min-h-[64px] z-10 bg-slate-800/20 p-4 space-x-4 ${applyConditionalStyle(
        direction === 'left',
        'rounded-e-2xl',
        'rounded-s-2xl'
      )}`}
    >
      {direction === 'left' ? (
        <>
          <PreviewImage previewImgSrc={previewImgSrc} direction={direction} />
          <Body
            direction={direction}
            title={title}
            copy={copy}
            logo={logo}
            link={link}
            icons={icons}
          />
        </>
      ) : (
        <>
          <Body
            direction={direction}
            title={title}
            copy={copy}
            logo={logo}
            link={link}
            icons={icons}
          />
          <PreviewImage previewImgSrc={previewImgSrc} direction={direction} />
        </>
      )}
    </div>
  </div>
);

export default ProjectView;
