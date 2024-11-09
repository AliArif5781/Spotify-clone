import { loginUrl } from "../Services/Spotify";
import image from "/Spotify_Logo_RGB_Black.png";

const FirstPage = () => {
  return (
    <div className="main-contianer ">
      <img src={image} alt="spotify" className=" container-img" />
      <a href={loginUrl} className="button-container">
        Connect Spotify
      </a>
    </div>
  );
};

export default FirstPage;
