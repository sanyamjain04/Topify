import { useRecoilState } from "recoil";
import { playingTrackState, recentlyPlayedTracks } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import Body from "./Body";
import Right from "./Right";
import Sidebar from "./Sidebar";
import recentPlayedCache from '../utils/cache'
import MusicPlayer from './musicplayer/index'

const Dashboard = () => {
  const [playingTrack, setPlayingTrack] =
    useRecoilState<Track>(playingTrackState);
  const [recentlyPlayed, setRecentlyPlayed] = useRecoilState<Track[]>(recentlyPlayedTracks);

  const chooseTrack = (track: Track) => {

    const cachedData = recentPlayedCache(track.key, track)
    setRecentlyPlayed([...cachedData])
    
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-screen bg-black lg:pb-24">
      <Sidebar />
      <Body chooseTrack={chooseTrack} />
      {recentlyPlayed.length > 0 && (
        <Right
          chooseTrack={chooseTrack}
          recentlyPlayed={recentlyPlayed}
        />
      )}

      {playingTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <MusicPlayer trackUrl={playingTrack?.url} />
        </div>
       )}
    </main>
  );
};

export default Dashboard;
