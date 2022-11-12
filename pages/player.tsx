import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { likeTracksState, playingTrackState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import Head from "next/head";
import dynamic from "next/dynamic";
import CurrentTrack from "../components/CurrentTrack";

const CurrentPlaylist = dynamic(() => import("../components/CurrentPlaylist"), {
  ssr: false,
});

const Player = () => {
  const [likedTracks, setLikedTracks] = useRecoilState<Track[]>(likeTracksState);
  const currentTrack = useRecoilValue<Track>(playingTrackState);

  useEffect(() => {
    setLikedTracks(JSON.parse(localStorage.getItem("likedPlaylist")!));
  }, []);

  return (
    <div className="md:w-[calc(100vw-120px)]">
      <Head>
        <title>Spotify - Playlist</title>
      </Head>

      <section className="flex justify-center gap-2 sm:ml-24 p-2 h-4/5">
        {currentTrack && (
          <div className="w-1/2">
            <CurrentTrack />
          </div>
        )}
        <div className="w-1/2">
          <CurrentPlaylist />
        </div>
      </section>
    </div>
  );
};

export default Player;
