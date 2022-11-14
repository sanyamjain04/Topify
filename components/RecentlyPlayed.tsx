import { useContext } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import TrackContext from "../hooks/trackContext";
import { Track } from "../types/body.types";

interface RecentlyPlayedprops {
  track: Track;
  button: boolean;
  playlist: Track[];
}

function RecentlyPlayed({ track, playlist, button }: RecentlyPlayedprops) {
  const [play, setPlay] = useRecoilState(playState);
  const playingTrack = useRecoilValue(playingTrackState);
  const { chooseTrack } = useContext(TrackContext);

  const handlePlay = () => {
    chooseTrack(track, playlist);

    if (track.url === playingTrack?.url) {
      setPlay(!play);
    }
  };

  return (
    <div className="flex items-center space-x-3 px-2 py-1" onClick={handlePlay}>
      <div className="flex w-5/6 gap-3 items-center ">
        <img
          src={track.images.coverart}
          alt=""
          className="rounded-full w-[52px] h-[52px]"
        />
        <div className="flex-grow flex flex-col ">
          <h4 className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px]">
            {track.title}
          </h4>
          <p className="truncate text-xs text-[#686868] font-semibold cursor-pointer hover:underline">
            {(track?.artists[0]?.alias || "").replace("-", " ").slice(0, 15) || ""}
          </p>
        </div>
      </div>
      <div className={button ? "flex justify-end w-1/6" : "hidden"}>
        {track.url === playingTrack?.url && play ? (
          <>
            <div
              className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center bg-[#15883e] icon hover:scale-110"
              onClick={handlePlay}
            >
              <BsFillPauseFill className="text-white text-xl" />
            </div>
          </>
        ) : (
          <>
            <div
              className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center  hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
              onClick={handlePlay}
            >
              <BsFillPlayFill className="text-white text-xl ml-[1px]" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecentlyPlayed;
