import { useRecoilState, } from "recoil";
import { useEffect } from "react";
import { likeTracksState } from "../atoms/playerAtom";
import { Track as Tracktype } from "../types/body.types";
import Head from "next/head";
import dynamic from "next/dynamic";

const CurrentPlaylist = dynamic(() => import("../components/CurrentPlaylist"), { ssr: false });

const Player = () => {
  const [likedTracks, setLikedTracks] = useRecoilState<Tracktype[]>(likeTracksState);

  useEffect(() => {
    setLikedTracks(JSON.parse(localStorage.getItem("likedPlaylist")!));
  }, []);

  return (
    <div className="md:w-[calc(100vw-120px)]">
      <Head>
        <title>Spotify - Playlist</title>
      </Head>

        <section className="sm:ml-24 p-2 w-full">
          <div className="w-full">
            <CurrentPlaylist />
          </div>
        </section>
    </div>
  );
};

export default Player;
