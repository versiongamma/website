import { To, useLinkClickHandler } from "react-router-dom";

const useNavigate = (
  to: To,
  delay?: number,
  animationHandlers?: React.Dispatch<React.SetStateAction<boolean>>[]
) => {
  const handleLoadPage = useLinkClickHandler(to);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    animationHandlers?.forEach((handler) => handler(false));

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
