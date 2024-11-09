import { Globe, ChevronRight, ChevronLeft } from "lucide-react";
import RightSection from "./RightSection";
import { useFetchPlaylistsQuery } from "../app/feature/SpotifyApiSlice";
import { Playlist } from "../types/type";
import { useEffect, useState } from "react";
import LeftSkeleton from "../components/LeftSkeleton";
// import "../components/CustomScrollBar.css";
import { useDispatch } from "react-redux";
import { clearToken } from "../app/feature/AuthSlice";

const Section = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );
  const [isLeftSectionVisible, setIsLeftSectionVisible] = useState(false);
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data, error } = useFetchPlaylistsQuery();

  useEffect(() => {
    const savedPlayListId = localStorage.getItem("SelectedPlayList");
    if (savedPlayListId && data) {
      const savedPlayList = data.items.find(
        (playlist: Playlist) => playlist.id === savedPlayListId
      );
      setSelectedPlaylist(savedPlayList || null);
    }
  }, [data]);

  const handlePlaylist = (spiData: Playlist) => {
    setSelectedPlaylist(spiData);
    localStorage.setItem("SelectedPlayList", spiData.id);
  };

  const toggleLeftSection = () => {
    setIsLeftSectionVisible(!isLeftSectionVisible);
  };

  const reAuthenticate = () => {
    dispatch(clearToken());
    setAuthenticate(false);
  };

  useEffect(() => {
    if (error) {
      setAuthenticate(true);
    } else {
      setAuthenticate(false);
    }
  }, [error]);

  return (
    <div>
      {/* Toggle Button */}
      <div
        className={`absolute top-1/4 -translate-y-1/2 left-4 z-20 cursor-pointer ${
          isLeftSectionVisible ? "hidden" : "block"
        }`}
        onClick={toggleLeftSection}
      >
        <ChevronRight className="h-8 w-8 text-white" />
      </div>

      <div className="section flex">
        {/* Left Section */}
        <div
          className={`left-section fixed top-0 left-0 h-full transform ${
            isLeftSectionVisible ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out w-64 bg-gray-900 z-30 flex flex-col`}
        >
          {/* Toggle Close Button */}
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={toggleLeftSection}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </div>

          {/* Top header */}
          <div className="top-header p-4">
            <div className="svg-icon flex items-center gap-2">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="icon h-6 w-6"
              >
                <path
                  fill="#F6F6F6"
                  d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
                ></path>
              </svg>
              <span className="header-text text-white font-semibold">
                Your Library
              </span>
            </div>
          </div>

          {/* Main Content Area with Flex Grow */}
          <div className="flex-grow overflow-hidden">
            {authenticate ? (
              <div className="flex flex-col items-center justify-center p-6 text-white rounded-lg shadow-lg w-full">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Your Account Token is Expired
                </h2>
                <p className="text-center mb-4">
                  Please re-authenticate your account.
                </p>
                <button
                  onClick={reAuthenticate}
                  className="mt-2 p-2 bg-white text-Black font-semibold rounded-lg transition duration-300 hover:bg-gray-200"
                >
                  Click Here to Re-authenticate
                </button>
              </div>
            ) : (
              <div className="playlist-container h-[calc(100vh-240px)] px-2">
                <h3 className="text-white font-semibold px-4 py-2">
                  Your Playlist
                </h3>
                <div className="overflow-y-auto pb-10 h-full custom-scrollbar">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-gray-900 z-10">
                      <tr className="text-white text-left">
                        <th scope="col" className="px-4 py-2 w-12">
                          #
                        </th>
                        <th scope="col" className="px-4 py-2">
                          Title
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      {data?.items && data.items.length > 0 ? (
                        data.items.map((spiData: Playlist, index) => (
                          <tr
                            key={spiData.id}
                            className="hover:bg-E-Black hover:rounded-lg cursor-pointer transition-colors"
                            onClick={() => handlePlaylist(spiData)}
                          >
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2 truncate">
                              {spiData.name}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <LeftSkeleton />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="mt-auto p-4 border-t border-gray-800">
            <div className="footer-links text-sm text-gray-400">
              <ul className="grid grid-cols-2 gap-2">
                <li className="hover:text-white cursor-pointer">Legal</li>
                <li className="hover:text-white cursor-pointer">
                  Safety & Privacy
                </li>
                <li className="hover:text-white cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer">Cookies</li>
                <li className="hover:text-white cursor-pointer">About Ads</li>
                <li className="hover:text-white cursor-pointer">
                  Accessibility
                </li>
              </ul>
            </div>

            <div className="language-selector mt-4">
              <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <Globe className="h-4 w-4" />
                <span className="text-sm">English</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <RightSection selectedPlaylist={selectedPlaylist} />
      </div>
    </div>
  );
};

export default Section;
