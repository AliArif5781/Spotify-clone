import Sound from "./Sound";
import VolumeControl from "./VolumeControl";
import { useSelector } from "react-redux";
import { RootState } from "../app/feature/store";
import { Artists } from "../types/type3";
import { useRef } from "react";

const CurrentTrack = () => {
  const currentTrack = useSelector(
    (state: RootState) => state.currentTrack.track
  );
  // console.log("currentTracks from Redux:", currentTrack);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  return (
    <div className="p-3 bg-Black text-white fixed bottom-0 w-full ">
      {currentTrack ? (
        <div className="flex items-center justify-between space-x-4 px-3">
          <div className="flex">
            <img
              src={currentTrack.album.images[0].url}
              className="h-[60px] w-[60px] rounded-lg"
              alt={`${currentTrack.name} cover`}
            />
            <div className="flex flex-col px-3">
              <p className="text-lg font-semibold"> {currentTrack.name}</p>
              <p className="text-sm text-gray-400 hover:underline cursor-pointer hidden md:flex">
                {currentTrack.artists.map(
                  (artistName: Artists) => artistName.name
                )}
              </p>
            </div>
          </div>
          <VolumeControl audioRef={audioRef} />
          <div className="hidden md:flex">
            <Sound audioRef={audioRef} />
          </div>
        </div>
      ) : (
        <p className="text-custom-white-black-bg text-center text-lg font-bold">
          No track is currently playing
        </p>
      )}
    </div>
  );
};

export default CurrentTrack;
