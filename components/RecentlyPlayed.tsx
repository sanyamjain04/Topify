import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";

interface RecentlyPlayedprops {
    track : Track
    chooseTrack : (track : Track) => void
}

function RecentlyPlayed({ track, chooseTrack }:RecentlyPlayedprops) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.url === playingTrack.url) {
      setPlay(!play);
    }
  };

  return (
    <div className="flex items-center space-x-3" onClick={handlePlay}>
      <img
        src={track.images.coverart}
        alt=""
        className="rounded-full w-[52px] h-[52px]"
      />
      <div>
        <h4 className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px]">
          {track.title}
        </h4>
        <p className="text-xs text-[#686868] font-semibold cursor-pointer hover:underline">
          {(track.artists[0].alias).replace("-"," ")}
        </p>
      </div>
    </div>
  );
}

export default RecentlyPlayed;