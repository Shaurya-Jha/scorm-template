"use client";

import { sfxVolumeAtom } from "../../lib/store";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export default function VoiceOver(props: {
  data: string;
  children: ({ isPlaying }: { isPlaying: boolean }) => React.ReactNode;
}) {
  const { data, children } = props;
  const [sfxVolume] = useAtom(sfxVolumeAtom);

  const [isPlaying, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(data);
    audioRef.current = audio;
    audio.volume = sfxVolume;
    audio.play();
    setPlaying(true);
    audio.onended = () => {
      setPlaying(false);
    };

    // Cleanup: stop audio when component unmounts or data changes
    return () => {
      if (!isPlaying) return;
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
      audioRef.current = null;
    };
  }, [data]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = sfxVolume;
    }
  }, [sfxVolume]);

  return children({ isPlaying });
}