import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { Track } from "../types/body.types";
import { useRecoilState } from "recoil";
import { likeTracksState, playingTrackState, playState } from "../atoms/playerAtom";
import Image from "next/legacy/image";
import TrackContext from "../hooks/trackContext";
import { useContext, useState, useEffect } from "react";
import Heart from "./track/Heart";

interface PosterProps {
    track : Track
    playlist : Track[]
}

function Poster({ track, playlist }: PosterProps) {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [play, setPlay] = useRecoilState<boolean>(playState);
  const [likedTracks, setLikedTracks] = useRecoilState<Track[]>(likeTracksState);
  const [playingTrack, setPlayingTrack] = useRecoilState<Track>(playingTrackState);
  const {chooseTrack} = useContext(TrackContext)

  const index = likedTracks?.findIndex(
    (tracks: Track) => tracks.key === track.key
  );
  useEffect(() => {
    let liked = index !== -1 ? true : false;
    setHasLiked(liked);
  }, [index]);

  useEffect(() => {
    localStorage.removeItem("likedPlaylist");
    localStorage.setItem("likedPlaylist", JSON.stringify(likedTracks));
  }, [index]);

  const handlePlay = () => {
    chooseTrack(track, playlist );
    if(!playingTrack){
        setPlay(!play)
    }

    if (track.url === playingTrack?.url) {
      setPlay(!play);
    }
  };
  function handleLike() {
    if (index == -1) {
      setLikedTracks([...likedTracks, track]);
    } else {
      const newAraay = likedTracks.filter((el: Track) => el.key !== track.key);
      setLikedTracks(newAraay);
    }
  }

  return (
    <div
      className="w-[90px] h-[142px] sm:w-[160px] sm:h-[200px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group"
        onClick={handlePlay}
    >
      <Image
        src={track.images.coverart}
        alt=""
        className="h-12 w-12 absolute inset-0 object-contain rounded-[50px] opacity-80 group-hover:opacity-100 p-2"
        quality={0}
        width={320}
        height={320}
        draggable="false"
      />

      <div className="absolute bottom-4 inset-x-0 ml-1 flex items-center space-x-2">
        <div className="w-4 h-4 sm:h-10 sm:w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {track.url === playingTrack?.url && play ? (
            <BsFillPauseFill className="text-white text-xl" />
          ) : (
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[10px] sm:text-[15px]">
          <h4 className="font-bold truncate w-40">{track.title}</h4>
          <h6 className="capitalize truncate">
            {track.artists[0].alias.replace("-", " ")}
          </h6>
        </div>
      </div>
      
      <div className=" hidden group-hover:block absolute top-4 right-4">
        <Heart hasLiked={hasLiked} handleLike={handleLike} />
      </div>
    </div>
  );
}

export default Poster;
