import { BiCaretRightCircle, BiCaretLeftCircle } from "react-icons/bi";

type Props = {
  src?: string | null;
};

const Overlay = ({ src }: Props) => {
  if (!src) {
    return null;
  }

  return (
    <div
      className="fixed flex items-center justify-center top-0 left-0 bg-slate-800/60 
  w-screen h-screen overflow-hidden z-10 space-x-4"
    >
      <button className="rounded-full hover-bg p-2">
        <BiCaretLeftCircle className="w-24 h-24" />
      </button>
      <img
        src={src}
        className=" self-center flex-grow-0 max-w-[80vw] max-h-[80vh]"
      />
      <button>
        <BiCaretRightCircle className="w-24 h-24" />
      </button>
    </div>
  );
};

export default Overlay;
