import Head from "next/head";
import { useRecoilState } from "recoil";
import { playingTrackState, recentlyPlayedTracks } from "../atoms/playerAtom";
import RecentlyPlayed from "../components/RecentlyPlayed";
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
        <div className="m-2 sm:ml-28 w-full h-screen">
          <h1 className="text-white mb-3">Recently Played Tracks</h1>
          <div>
            <div className="border-2 border-[#262626] rounded-2xl overflow-y-scroll w-full h-full max-w-xl max-h-[78vh] scrollbarThin">
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
          <div className="h-20" />
        </div>
      ) : (
        <div className="ml-28 flex justify-center items-center w-[calc(100vw-80px)]">
          <h1 className="text-center text-white">No Songs Played </h1>
        </div>
      )}
    </>
  );
}
