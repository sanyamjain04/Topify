import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  musicTrackState,
  playingTrackState,
  playState,
  recentlyPlayedTracks,
} from "../../atoms/playerAtom";
import { Track as TrackType } from "../../types/body.types";
import recentPlayedCache from "../../utils/cache";
import Track from "./Track";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [recentlyPlayed, setRecentlyPlayed] = useRecoilState(recentlyPlayedTracks);
  const [musicTracks, setmusicTracks] = useRecoilState(musicTrackState);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const currentTrackKey = playingTrack?.key;
  const index = musicTracks.findIndex((track) => track.key === currentTrackKey);

  useEffect(() => {
    localStorage.removeItem("recentlyPlayed");
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
    const data = JSON.parse(localStorage.getItem("recentlyPlayed")!);
    console.log(data);
  }, [recentlyPlayed]);

  const handlePlayPause = () => {
    setPlay(!play);
  };

  const chooseTrack = (track: TrackType) => {
    const cachedData = recentPlayedCache(track.key, track);
    setRecentlyPlayed([...cachedData]);
    setPlayingTrack(track);
  };

  const handleNextSong = () => {
    if (shuffle) {
      chooseTrack(musicTracks[Math.floor(Math.random() * musicTracks.length)]);
    } else if (repeat) {
      chooseTrack(playingTrack);
    } else {
      const nextTrack =
        musicTracks[index === musicTracks.length - 1 ? 0 : index + 1];
      chooseTrack(nextTrack);
    }
  };

  const handlePrevSong = () => {
    const nextTrack =
      musicTracks[index === 0 ? musicTracks.length - 1 : index - 1];
    chooseTrack(nextTrack);
  };

  return (
    <div className="bg-[#181818] flex items-center justify-between px-5 py-2.5 rounded-t-2xl relative sm:space-x-20 md:space-x-0 overflow-x-scroll md:overflow-x-hidden scrollbar-hide">
      <Track play={play} playingTrack={playingTrack} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          play={play}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          musicTracks={musicTracks}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min={0}
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          playingTrack={playingTrack}
          volume={volume}
          play={play}
          seekTime={seekTime}
          repeat={repeat}
          onEnded={handleNextSong}
          onTimeUpdate={(event: any) => setAppTime(event.target.currentTime)}
          onLoadedData={(event: any) => setDuration(event.target.duration)}
        />
      </div>
      <VolumeBar
        value={volume}
        min={0}
        max={1}
        onChange={(event) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
