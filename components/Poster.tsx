import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { Track } from "../types/body.types";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import Image from "next/legacy/image";

interface PosterProps {
    track : Track
    chooseTrack : (track : Track) => void
}

function Poster({ track, chooseTrack }: PosterProps) {
  const [play, setPlay] = useRecoilState<boolean>(playState);
  const [playingTrack, setPlayingTrack] =
    useRecoilState<Track>(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);
    if(!playingTrack){
        setPlay(!play)
    }

    if (track.url === playingTrack?.url) {
      setPlay(!play);
      
    }
  };
  
  

  return (
    <div
      className="w-[160px] h-[200px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group"
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

      <div className="absolute bottom-4 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {track.url === playingTrack?.url && play ? (
            <BsFillPauseFill className="text-white text-xl" />
          ) : (
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[15px]">
          <h4 className="font-bold truncate w-44">{track.title}</h4>
          <h6 className="capitalize">
            {track.artists[0].alias.replace("-", " ")}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Poster;
