import { animated, useSpring } from "@react-spring/web";

type Props = {
  unload: boolean;
  className?: string;
  children: React.ReactNode;
};

const ContentWrapper = ({ unload, className, children }: Props) => {
  const [springs] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      reset: true,
      reverse: unload,
    }),
    [unload]
  );

  return (
    <animated.div className={className ?? ""} style={springs}>
      {children}
    </animated.div>
  );
};

export default ContentWrapper;
