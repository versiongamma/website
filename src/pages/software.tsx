import { useCallback, useState } from 'react';
import Particles from 'react-particles';
import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

import Background from '../components/background';
import ContentWrapper from '../components/content-wrapper';
import NavigationBar from '../components/navigation-bar';
import ScreenWarning from '../components/screen-warning';
import {
  GameDB,
  Horde,
  Joyous,
  Website,
} from '../components/software/projects';
import { usePageLoadTypeStore } from '../hooks/use-store';
import useViewport from '../hooks/use-viewport';

const BREAKPOINT = 800;

const SoftwarePage = () => {
  const [unload, setUnload] = useState(false);
  const { playPageFullLoad } = usePageLoadTypeStore();
  const { width } = useViewport();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const handleNavigate = () => {
    setUnload(true);
  };

  const showScreenWarning = width < BREAKPOINT;

  return (
    <>
      <Background>
        <ContentWrapper
          unload={unload}
          className="pt-14 pb-14 overflow-y-auto space-y-6"
        >
          {showScreenWarning ? (
            <ScreenWarning />
          ) : (
            <>
              <Joyous />
              <GameDB />
              <Website />
              <Horde />
            </>
          )}
          <Particles
            init={particlesInit}
            options={{
              background: {
                opacity: 0,
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: {
                    enable: false,
                  },
                  onHover: {
                    enable: false,
                  },
                  resize: true,
                },
              },
              particles: {
                color: {
                  value: '#FFFFFF',
                },
                links: {
                  color: '#FFFFFF',
                  distance: showScreenWarning ? 150 : 300,
                  enable: true,
                  opacity: 0.2,
                  width: 2,
                },
                move: {
                  direction: 'none',
                  enable: true,
                  outModes: {
                    default: 'bounce',
                  },
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: {
                    area: 10,
                  },
                  value: 100,
                },
                opacity: {
                  value: 0,
                },
                shape: {
                  type: 'circle',
                },
                size: {
                  value: { min: 5, max: 10 },
                },
              },
              detectRetina: true,
            }}
          />
        </ContentWrapper>
      </Background>
      <NavigationBar
        shown
        enterImmediately={!playPageFullLoad}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default SoftwarePage;
