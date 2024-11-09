import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/feature/store";
import { IoMdPause, IoMdPlay } from "react-icons/io";

interface VolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const VolumeControl = ({ audioRef }: VolumeControlProps) => {
  const currentTrack = useSelector(
    (state: RootState) => state.currentTrack.track
  );
  // const trackList = useSelector(
  //   (state: RootState) => state.currentTrack.trackList
  // );
  // const currentTrackIndex =
  //   trackList?.findIndex((track) => track.id === currentTrack?.id) || 0;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  console.log(duration);

  // Reset states when track changes
  useEffect(() => {
    if (currentTrack) {
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [currentTrack?.id]); // Only trigger when track ID changes

  // Update audio player state
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      // If a new track was loaded and should start playing
      if (currentTrack?.preview_url === audio.src) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Set initial states
    if (audio.duration) {
      setDuration(audio.duration);
    }
    setIsPlaying(!audio.paused);

    // Cleanup
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef.current, currentTrack?.preview_url]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Playback failed:", error);
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatDuration = (durationMs?: number) => {
    if (!durationMs) return "0:00";
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handlePlayPause}
          className=" text-C-Black bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isPlaying ? <IoMdPause size={24} /> : <IoMdPlay size={24} />}
        </button>
      </div>

      <div className="flex items-center gap-2 w-full">
        <span className="text-xs text-A-White min-w-[40px]">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          // max={duration || 100}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-A-White min-w-[40px]">
          {formatDuration(currentTrack?.duration_ms)}
        </span>
      </div>
    </div>
  );
};

export default VolumeControl;
