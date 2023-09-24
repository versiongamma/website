import { To, useLinkClickHandler } from "react-router-dom";

const useNavigate = (to: To, delay?: number, handlers?: (() => void)[]) => {
  const handleLoadPage = useLinkClickHandler(to);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handlers?.forEach((handler) => handler && handler());

    if (delay) {
      setTimeout(() => {
        handleLoadPage(event);
      }, delay);

      return;
    }

    handleLoadPage(event);
  };

  return [navigate] as const;
};

export default useNavigate;
