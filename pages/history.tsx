import Head from "next/head";
import { useRecoilState } from "recoil";
import { playingTrackState, recentlyPlayedTracks } from "../atoms/playerAtom";
import RecentlyPlayed from "../components/RecentlyPlayed";
import Track from "../components/Track";
import { Track as TrackType } from "../types/body.types";
import recentPlayedCache from "../utils/cache";

export default function History() {
  const [playingTrack, setPlayingTrack] =
    useRecoilState<TrackType>(playingTrackState);
  const [recentlyPlayed, setRecentlyPlayed] =
    useRecoilState<TrackType[]>(recentlyPlayedTracks);

  const chooseTrack = (track: TrackType) => {
    const cachedData = recentPlayedCache(track.key, track);
    setRecentlyPlayed([...cachedData]);

    setPlayingTrack(track);
  };
  return (
    <>
      <Head>
        <title>Spotify - History </title>
        <meta
          name="description"
          content="Spotify Clone built with NEXTJS and Typescript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {recentlyPlayed.length > 0 ? (
        <div className="m-4 ml-10 md:ml-28">
          <h1 className="text-white mb-5">History</h1>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl lg:p-3 bg-[#0D0D0D] overflow-y-scroll h-[370px]  md:h-[22.9rem] scrollbarThin md:w-[655px] lg:w-[780px] w-full">
            {[...recentlyPlayed].reverse().map((track, i) => (
              <RecentlyPlayed
                key={i}
                track={track}
                chooseTrack={chooseTrack}
                button={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="ml-28 flex justify-center items-center w-[calc(100vw-80px)]">
          <h1 className="text-center text-white">No Songs Played </h1>
        </div>
      )}
    </>
  );
}
