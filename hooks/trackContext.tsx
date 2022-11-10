import { createContext, useState, useEffect, ReactNode } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentPlaylistState,
  playingTrackState,
  playState,
  recentlyPlayedTracks,
} from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import recentPlayedCache from "../utils/cache";

type chooseTrack =(
  track: Track,
  playlist: Track[]
) => void

type ITrackContext = {
  chooseTrack: chooseTrack
}

const TrackContext = createContext<ITrackContext>(null as any);

export const TrackProvider = ({children}: {children: ReactNode} )  => {
  const [play, setPlay] = useRecoilState(playState);
  const setCurrentPlaylist = useSetRecoilState(currentPlaylistState);
  const setRecentlyPlayed = useSetRecoilState(recentlyPlayedTracks);
  const setPlayingTrack = useSetRecoilState(playingTrackState);

  const chooseTrack :chooseTrack = ( track, playlist ) => {
    
    setCurrentPlaylist(playlist);
    const cachedData = recentPlayedCache(track.key, track);
    setRecentlyPlayed([...cachedData]);

    setPlayingTrack(track);
    if (!play) setPlay(!play);

  };

  return (
    <TrackContext.Provider value={{chooseTrack}}>{children}</TrackContext.Provider>
  );
  
};

export default TrackContext;
