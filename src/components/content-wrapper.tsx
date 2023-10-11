import { animated, useSpring } from "@react-spring/web";

type Props = {
  unload: boolean;
  hide?: boolean;
  backgroundClassName?: string;
  backgroundStyle?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

const ContentWrapper = ({
  unload,
  hide,
  className,
  backgroundClassName,
  backgroundStyle,
  children,
}: Props) => {
  const [springs] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reset: true,
      reverse: unload,
      instant: hide,
    }),
    [unload, hide]
  );

  return (
    <animated.div className="h-screen w-screen" style={springs} hidden={hide}>
      <div
        className={`content-wrap ${backgroundClassName ?? ""}`}
        style={backgroundStyle}
      >
        <main className={`flex flex-col w-full h-full ${className ?? ""}`}>
          {children}
        </main>
      </div>
    </animated.div>
  );
};

export default ContentWrapper;
