import { useRecoilState } from "recoil";
import { useEffect } from "react";
import {
  likeTracksState,
  playingTrackState,
  playState,
  recentlyPlayedTracks,
} from "../atoms/playerAtom";
import Poster from "../components/Poster";
import { Track } from "../types/body.types";
import recentPlayedCache from "../utils/cache";
import Head from "next/head";

const playlist = () => {
  const [likedTracks, setLikedTracks] = useRecoilState<Track[]>(likeTracksState);
  const [playingTrack, setPlayingTrack] = useRecoilState<Track>(playingTrackState);
  const [recentlyPlayed, setRecentlyPlayed] = useRecoilState<Track[]>(recentlyPlayedTracks);
  const [play, setPlay] = useRecoilState<boolean>(playState);

  useEffect(() => {
    setLikedTracks(JSON.parse(localStorage.getItem("likedPlaylist")!));
  }, []);

  const chooseTrack = (track: Track) => {
    const cachedData = recentPlayedCache(track.key, track);
    setRecentlyPlayed([...cachedData]);

    setPlayingTrack(track);
    if (!play) setPlay(!play);
  };
  return (
    <>
      <Head>
        <title>Spotify - Playlist</title>
      </Head>
      <section className="ml-24 p-2 w-[calc(100vw-110px)]">
        <div className="flex flex-col w-full">
        {likedTracks && (
          <>
            <h1 className="p-2">Liked Playlist</h1>
            <div className="m- overflow-y-scroll scrollbarThin">
              <div className="flex gap-3 p-1 h-[220px] min-w-max">
                {likedTracks.map((track: Track, i: number) => (
                  <Poster track={track} key={i} chooseTrack={chooseTrack} />
                  ))}
              </div>
            </div>
          </>
        )}
        </div>
      </section>
    </>
  );
};

export default playlist;
