import React, { useEffect, useState } from "react";
import fileIcon from "../../public/assets/file.jpg";
import videoIcon from "../../public/assets/video.jpg";
import imageIcon from "../../public/assets/icon-image.jpg";
import { UserContext } from "../Context/UserProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Card = ({ item , isMyProfile}) => {
  const [type, setType] = useState("");
  const { name, owner, url, date } = item;
  const {isLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();

  const handleDownload = () => {
    if(isLoggedIn){
      // Implement download functionality here
    window.open(url); // Opens the URL in a new tab for download
    }else{
      navigate('/login');
    }
    
  };


  const categorizeFileType = (url) => {
    // Get the file name from the URL
    const fileName = url.substring(url.lastIndexOf("/") + 1);

    // Get the file extension
    const fileExtension = fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toLowerCase();

    // Define accepted image and video file extensions
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const videoExtensions = ["mp4", "avi", "mkv", "mov", "wmv", "flv", "webm"];

    // Check if the file extension matches image extensions
    if (imageExtensions.includes(fileExtension)) {
      return "image";
    }

    // Check if the file extension matches video extensions
    if (videoExtensions.includes(fileExtension)) {
      return "video";
    }

    // If not image or video, categorize as 'other'
    return "file";
  };

  useEffect(() => {
    if (url) {
      setType(categorizeFileType(url));
    }
  }, [url]);

  return (
    <div
      style={{ cursor: "pointer" }}
      className="border-[#A56DC1] border-2 w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded-lg relative transition-all shadow-2xl hover:scale-105 bg-white"
    >
      <img
        className="h-[60%] flex m-auto object-cover"
        src={type === "image" ? url : type === "video" ? videoIcon : fileIcon}
        alt=""
      />
      <div className="bg-violet-50">
        <h2 className="text-ellipsis line-clamp-1 my-1 pl-2">{name}</h2>
        <div className="flex items-center justify-between my-1-2 pl-2">
          <p className="text-sm text-neutral-400">{owner}</p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-[#A56DC1] m-2 py-2 w-[90%] rounded-lg text-white font-bold"
            onClick={handleDownload}
          >
            Open
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Card;


 