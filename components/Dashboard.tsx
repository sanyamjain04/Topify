import { useRecoilState } from "recoil";
import { playingTrackState, playState, recentlyPlayedTracks } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import Body from "./Body";
import Right from "./Right";
import recentPlayedCache from "../utils/cache";

const Dashboard = () => {
  const [playingTrack, setPlayingTrack] = useRecoilState<Track>(playingTrackState);
  const [recentlyPlayed, setRecentlyPlayed] = useRecoilState<Track[]>(recentlyPlayedTracks);
  const [play, setPlay] = useRecoilState<boolean>(playState);

  const chooseTrack = (track: Track) => {
    const cachedData = recentPlayedCache(track.key, track);
    setRecentlyPlayed([...cachedData]);

    setPlayingTrack(track);
    if(!play) setPlay(!play)
  };

  return (
    <>
      <Body chooseTrack={chooseTrack} />
      <Right chooseTrack={chooseTrack} recentlyPlayed={recentlyPlayed} />     
    </>
  );
};

export default Dashboard;
