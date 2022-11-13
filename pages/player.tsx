import { useRecoilValue } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import Head from "next/head";
import dynamic from "next/dynamic";
import CurrentTrack from "../components/CurrentTrack";

const CurrentPlaylist = dynamic(() => import("../components/CurrentPlaylist"), {
  ssr: false,
});

const Player = () => {
  const currentTrack = useRecoilValue<Track>(playingTrackState);

  return (
    <div className="md:w-[calc(100vw-120px)]">
      <Head>
        <title>Spotify - Playlist</title>
      </Head>

      <section className="flex flex-col justify-center gap-2 sm:ml-24 p-2">
        {currentTrack && (
          <div className="sm:hidden">
            <CurrentTrack />
          </div>
        )}
        <div className="sm:ml-8">
          <CurrentPlaylist />
        </div>
      </section>
    </div>
  );
};

export default Player;
