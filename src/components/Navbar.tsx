import spotifyLogo from "/spotify.png";
import { useGetCurrentUserProfileQuery } from "../app/feature/SpotifyApiSlice";
import sptlogo from "/spotifylogo1.webp";
import NavbarSkeleton from "./NavbarSkeleton";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { data } = useGetCurrentUserProfileQuery();

  return (
    <>
      <div className="main-section">
        <div className="one-section flex items-center justify-between p-4">
          {/* Logo */}
          <Link to={"/"} className="spotify-logo">
            <img src={spotifyLogo} alt="Spotify-logo" className="logo h-8" />
          </Link>

          {/* Search btn (hidden on mobile/tablet) */}
          {/* <div className="SearchSection hidden md:flex items-center">
            <div className="Home-design">
              <div>
                <AiFillHome className="Home-icon" />
              </div>
            </div>
            <div className="search-section flex items-center"> */}
          {/* <div className="search mr-2">
                <Search />
              </div> */}
          {/* <input
                type="text"
                placeholder="What do you want to play?"
                className="search-btn border rounded px-2 py-1"
                id="searchinput"
              />
              <div className="browser">
                <div>
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="Svg-sc-ytk21e-0 bneLcE"
                  >
                    <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
                    <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z"></path>
                    <path
                      fill="#FAFAFA"
                      d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                    ></path>
                  </svg>
                </div>
              </div> */}
          {/* </div>
          </div> */}
          <Link to={"/"} className="cursor-pointer">
            <img src={sptlogo} alt="spotify-logo" className=" h-20" />
          </Link>
          {/* User section */}
          <div className="user-section flex items-center">
            <div className="login-in-section flex">
              {data ? (
                <>
                  <div className="relative mr-3 group">
                    <img
                      src={data.images[0].url}
                      alt=""
                      className="w-8 h-8 flex items-center justify-center text-white  rounded-full cursor-pointer shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                    />
                    <div className="bg-gray-900 text-white text-sm rounded shadow-lg absolute left-1/2 transform -translate-x-1/2 hidden group-hover:flex">
                      <p className="w-auto whitespace-nowrap overflow-hidden text-ellipsis text-center p-2">
                        {data?.display_name}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <NavbarSkeleton />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
