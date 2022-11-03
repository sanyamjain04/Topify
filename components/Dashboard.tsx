import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import Body from "./Body";
import Right from "./Right";
import Sidebar from "./Sidebar";
import { useState } from "react";
import recentPlayedCache from '../utils/cache'

const Dashboard = () => {
  const [playingTrack, setPlayingTrack] =
    useRecoilState<Track>(playingTrackState);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);

  const chooseTrack = (track: Track) => {

    const cachedData = recentPlayedCache(track.key, track)
    setRecentlyPlayed([...cachedData])
    
    const reverse = recentlyPlayed.reverse()
    
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body chooseTrack={chooseTrack} />
      {recentlyPlayed.length > 0 && (
        <Right
          chooseTrack={chooseTrack}
          recentlyPlayed={recentlyPlayed}
        />
      )}

      {/* {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )} */}
    </main>
  );
};

export default Dashboard;
