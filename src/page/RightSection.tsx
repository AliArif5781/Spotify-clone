import { useDispatch } from "react-redux";
import { useFetchPlaylistsQuery } from "../app/feature/SpotifyApiSlice";
import { Playlist } from "../types/type"; // Adjust the import path
import { clearToken } from "../app/feature/AuthSlice";
import { useEffect, useState } from "react";
import RightSkeleton from "../components/RightSkeleton";
import { setCurrentTrack } from "../app/feature/currentTrackReducer";

interface RightSectionProps {
  selectedPlaylist: Playlist | null;
}
type PlaylistNames = "Millionaire" | "Husn" | "Why" | "Party"; // Extend as needed

const colors: Record<PlaylistNames, string> = {
  Millionaire: "bg-B-White",
  Husn: "bg-custom-bg",
  Why: "bg-blue-100",
  Party: "bg-red-500",
};
const RightSection = ({ selectedPlaylist }: RightSectionProps) => {
  // console.log(selectedPlaylist);

  const dispatch = useDispatch();
  const { error, isLoading } = useFetchPlaylistsQuery();
  // const { data: playlists, error, isLoading } = useFetchPlaylistsQuery();
  const [bgColor, setbgColor] = useState<string>("bg-custom-bg");

  const changingBgColor = (playlist: Playlist | null) => {
    if (!playlist) return "bg-custom-bg";

    const PlaylistNames = playlist.name as PlaylistNames;
    return colors[PlaylistNames] || "bg-custom-bg";
  };
  useEffect(() => {
    setbgColor(changingBgColor(selectedPlaylist));
  }, [selectedPlaylist]);

  if (error) {
    function error() {
      dispatch(clearToken());
    }
    return (
      <div className="flex flex-col items-center justify-center p-6 text-white rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Your Account Token is Expired
        </h2>
        <p className="text-center mb-4">Please re-authenticate your account.</p>
        <button
          onClick={() => error()}
          className="mt-2 px-4 py-2 bg-white text-Black font-semibold rounded-lg transition duration-300 hover:bg-gray-200"
        >
          Click Here to Re-authenticate
        </button>
        <span className="pt-5">
          I use spotify api that,s why the token expire in every 1 hour. Click
          above to Re-authenticate your account.
        </span>
      </div>
    );
  }

  if (isLoading) {
    return <RightSkeleton />;
  }
  const formatDuration = (durationMs?: number) => {
    if (durationMs === undefined) return "0:00"; // Handle undefined case
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    //   // Format seconds to be two digits
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  const handleSongClick = (track: any) => {
    dispatch(setCurrentTrack(track));
    localStorage.setItem("currentTrack", JSON.stringify(track));
  };
  return (
    <>
      <div
        className={`rightSection custom-scrollbar h-full overflow-y-auto w-full pb-[100px] mx-4 rounded-xl p-6  ${bgColor} transition-all bg-gradient-to-b`}
      >
        {selectedPlaylist ? (
          <div className="">
            <h3 className="text-xl text-D-White mb-2">
              <div className="px-5 sm:py-9 grid grid-cols-0 sm:grid-cols-2">
                {selectedPlaylist.images[0]?.url && (
                  <>
                    <img
                      src={selectedPlaylist.images[0].url}
                      alt={`${selectedPlaylist.name} cover`}
                      className="h-[300px] mb-4 max-w-auto bg-cover"
                    />
                  </>
                )}
                <div className="flex items-center h-[270px] w-full">
                  <div className="flex-col px-10">
                    <p className="uppercase text-[15px]">
                      {selectedPlaylist.type}
                    </p>
                    <div>
                      <h1 className="sm:text-5xl text-3xl font-extrabold mt-5 text-White tracking-[3px] ">
                        {selectedPlaylist.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </h3>

            <div className="relative overflow-x-auto">
              <table className="min-w-full text-lg text-left text-Gray">
                <thead>
                  <tr className="text-md text-Gray uppercase">
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 hidden sm:flex">
                      Date added
                    </th>
                    <th scope="col" className="px-6 py-5 text-Gray">
                      <svg
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="Svg-sc-ytk21e-0 dYnaPI h-4 text-Gray"
                      >
                        <path
                          className="fill-current"
                          d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                        ></path>
                        <path
                          className="fill-current"
                          d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
                        ></path>
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlaylist.tracks.length > 0 ? (
                    selectedPlaylist.tracks.map((track, index) => (
                      <tr
                        key={`${selectedPlaylist.id}-${track.id}-${index}`}
                        className="hover:bg-E-Black hover:rounded-lg"
                        onClick={() => handleSongClick(track)}
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {index + 1}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          <div className="flex">
                            <img
                              src={track.album.images[0].url}
                              className="h-[60px] w-max object-cover rounded-lg"
                              alt={track.name}
                            />
                            <div className="px-5 cursor-pointer">
                              <p className="text-md text-White font-bold">
                                {track.name}
                              </p>
                              <p>{track.artists[0].name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden sm:flex">
                          {track.album.release_date}
                        </td>
                        <td className="px-6 py-4">
                          {formatDuration(track.duration_ms)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-D-White text-sm"
                      >
                        No tracks found in this playlist.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex h-screen md:h-screen justify-center items-center flex-col text-A-White">
            <h3 className="text-3xl font-bold text-center">
              Select Your PlayList
            </h3>
            <div className="text-lg pt-2 text-center">
              If you dont show playlist open your original spotify and add song
              to playlist.
            </div>
            <h3 className="text-3xl font-bold mt-10">Important </h3>
            <span className="text-center">
              If you don,t have premium spotify account few feature didn,t work.
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default RightSection;
