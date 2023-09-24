import { useState } from "react";
import { usePageLoadTypeStore } from "../hooks/use-store";

import ContentWrapper from "../components/content-wrapper";
import NavigationBar from "../components/navigation-bar";
import Background from "../components/background";

const VideoPage = () => {
  const [unload, setUnload] = useState(false);
  const { playPageFullLoad } = usePageLoadTypeStore();

  const handleNavigate = () => {
    setUnload(true);
  };

  return (
    <>
      <Background>
        <ContentWrapper
          className="space-y-2 flex items-center flex-col"
          unload={unload}
        >
          <h1 className="font-bold font-heading text-4xl animate-slideIn text-white">
            SOFTWARE
          </h1>
          <p className="text-white">This is the software page.</p>
        </ContentWrapper>
      </Background>
      <NavigationBar
        shown={true}
        enterImmediately={!playPageFullLoad}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default VideoPage;