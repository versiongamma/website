import { usePageLoadTypeStore } from "../hooks/use-store";
import { applyConditionalStyle } from "../utils/apply";

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => {
  const { playPageFullLoad } = usePageLoadTypeStore();
  return (
    <div
      className={`w-screen h-screen flex items-center flex-col justify-center background-gradient ${applyConditionalStyle(
        playPageFullLoad,
        "animate-fadeIn"
      )}`}
    >
      {children}
    </div>
  );
};
export default Background;
