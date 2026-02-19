import { useEffect, useRef, useState } from "react";
import { LaptopIcon } from "lucide-react";
import { Button } from "./Button";
import { useAtom } from "jotai";
import {
  completedModulesAtom,
  musicVolumeAtom,
  sfxVolumeAtom,
} from "../../lib/store";
import type { Course } from "../course";

export default function CoursePlayer({ course }: { course: Course }) {
  const modules = course.modules;

  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [loadedAssets, setLoadedAssets] = useState<Record<string, string>>({});
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const [completedModules, setCompletedModules] = useAtom(completedModulesAtom);

  const [musicVolume] = useAtom(musicVolumeAtom);
  const [sfxVolume] = useAtom(sfxVolumeAtom);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  const playingModule = currentModule !== null ? modules[currentModule] : null;
  const isVideoModule = playingModule?.type === "video";

  const allAssetsLoaded =
    playingModule &&
    Object.keys(playingModule.assets).every((k) => loadedAssets[k]);

  /* -------- Unified Module Controls -------- */

  // function complete() {
  //   if (currentModule === null) return;
  //   setCompletedModules((prev) => ({ ...prev, [currentModule]: true }));
  // }
  function complete() {
    setCompletedModules((prev) => {
      if (currentModule === null) return prev;
      return { ...prev, [currentModule]: true };
    });
  }

  function next() {
    if (currentModule === null) return;

    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  }

  function completeAndNext() {
    complete();
    next();
  }

  function goTo(index: number) {
    if (currentModule === null) return;

    // backward always allowed
    if (index <= currentModule) {
      setCurrentModule(index);
      return;
    }

    // forward only if previous completed
    if (completedModules[index - 1]) {
      setCurrentModule(index);
    }
  }

  /* -------- window resize -------- */

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* -------- asset preloader -------- */

  useEffect(() => {
    if (!playingModule) return;

    Object.entries(playingModule.assets).forEach(([key, url]) => {
      if (loadedAssets[key]) return;

      fetch(url)
        .then((r) => r.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setLoadedAssets((prev) => ({
              ...prev,
              [key]: reader.result as string,
            }));
          };
          reader.readAsDataURL(blob);
        });
    });
  }, [currentModule]);

  /* -------- video volume sync -------- */

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = sfxVolume;
  }, [sfxVolume]);

  /* -------- background music -------- */

  useEffect(() => {
    if (!course.backgroundMusic || currentModule === null) return;

    if (!musicRef.current) {
      musicRef.current = new Audio(course.backgroundMusic);
      musicRef.current.loop = true;
    }

    musicRef.current.volume = musicVolume;
    musicRef.current.play().catch(() => {});

    return () => musicRef.current?.pause();
  }, [musicVolume, currentModule, course.backgroundMusic]);

  /* -------- small screen guard -------- */

  if (windowWidth < 1100) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <LaptopIcon className="mx-auto mb-4 text-neutral-400" size={48} />
          <h1 className="text-2xl font-bold mb-2">Screen Too Small</h1>
          <p className="text-neutral-500">
            Please use a laptop or larger screen to take this course.
          </p>
        </div>
      </div>
    );
  }

  /* -------- UI -------- */

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-[100vw] max-h-[100vh] aspect-video bg-black">
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            {currentModule === null && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button onClick={() => setCurrentModule(0)}>
                  Start Course
                </Button>
              </div>
            )}

            {!allAssetsLoaded && currentModule !== null && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Loading...
              </div>
            )}

            {allAssetsLoaded && playingModule && (
              <>
                {/* -------- VIDEO -------- */}

                {isVideoModule && (
                  <video
                    key={playingModule.videoUrl}
                    ref={(el) => {
                      if (el) {
                        videoRef.current = el;
                        el.volume = sfxVolume;
                      }
                    }}
                    className="w-full h-full object-contain bg-black"
                    autoPlay
                    controls={false}
                    playsInline
                    onEnded={completeAndNext}
                  >
                    <source
                      src={loadedAssets[playingModule.videoUrl]}
                      type="video/mp4"
                    />

                    {playingModule.subtitles && (
                      <track
                        kind="subtitles"
                        srcLang="en"
                        src={loadedAssets[playingModule.subtitles]}
                        default
                      />
                    )}
                  </video>
                )}

                {/* -------- VIEW -------- */}

                {playingModule.type === "view" && (
                  <div className="w-full h-full object-contain bg-black">
                    {(() => {
                      const ViewComponent = playingModule.view;
                      return (
                        <ViewComponent
                          assets={loadedAssets}
                          currentModule={currentModule}
                          complete={complete}
                          next={next}
                          completeAndNext={completeAndNext}
                          goTo={goTo}
                        />
                      );
                    })()}
                  </div>
                )}

                {/*{playingModule.type === "view" && (
                <div className="w-full h-full">
                  {playingModule.view({
                    assets: loadedAssets,
                    currentModule,
                    complete,
                    next,
                    completeAndNext,
                    goTo,
                  })}
                </div>
              )}*/}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
