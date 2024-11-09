import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../app/feature/currentTrackReducer";
import { RootState } from "../app/feature/store";
import { Volume2, Volume1, VolumeX } from "lucide-react";
import "./Sound.css";
interface VolumeControlProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Sound = ({ audioRef }: VolumeControlProps) => {
  const dispatch = useDispatch();
  const volume = useSelector((state: RootState) => state.currentTrack.volume);
  const currentTracks = useSelector(
    (state: RootState) => state.currentTrack.track
  );

  const handleMuteToggle = () => {
    const newVolume = volume === 0 ? 50 : 0;
    dispatch(setVolume(newVolume)); // Update volume in Redux
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100; // Update the volume of the audio element
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    dispatch(setVolume(newVolume)); // Dispatch volume to Redux
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100; // Update the volume of the audio element
    }
  };

  // Determine the volume icon
  const renderVolumeIcon = () => {
    if (volume === 0) return <VolumeX />;
    if (volume < 45) return <Volume1 />;
    return <Volume2 />;
  };

  // Dynamically set the background style of the slider
  const sliderBackground = `linear-gradient(to right, #1db954 0%, #1db954 ${volume}%, #b3b3b3 ${volume}%, #b3b3b3 100%)`;

  return (
    <div className="sound flex space-x-3">
      <button onClick={handleMuteToggle}>{renderVolumeIcon()}</button>

      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          style={{ background: sliderBackground }} // Apply dynamic background
        />
        {currentTracks?.preview_url && (
          <audio ref={audioRef} src={currentTracks.preview_url} />
        )}
        <div className="px-2 font-semibold">{`${volume}%`}</div>
      </div>
    </div>
  );
};

export default Sound;
