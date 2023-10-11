import { useEffect, useState } from "react";

const useWaitForImgLoad = (src: string, callback?: () => void) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const preloadedImage = new Image();
    preloadedImage.onload = () => {
      console.log("image loaded");
      setLoaded(true);
      if (callback) {
        callback();
      }
    };
    preloadedImage.src = src;
  }, []);

  return loaded;
};

export default useWaitForImgLoad;
