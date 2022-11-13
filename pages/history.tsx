import Head from "next/head";
import { useRecoilValue } from "recoil";
import { recentlyPlayedTracks } from "../atoms/playerAtom";
import RecentlyPlayed from "../components/RecentlyPlayed";
import { Track } from "../types/body.types";

export default function History() {
  const recentlyPlayed = useRecoilValue<Track[]>(recentlyPlayedTracks);

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

            <div className="border-2 border-[#262626] rounded-2xl overflow-y-scroll w-full h-full max-h-[78vh] scrollbarThin">
              {[...recentlyPlayed].reverse().map((track, i) => (
                <RecentlyPlayed
                  key={i}
                  track={track}
                  playlist={recentlyPlayed}
                  button={true}
                />
              ))}
            </div>
            
          </div>
          <div className="h-20" />
        </div>
      ) : (
        <div className="sm:ml-28 flex justify-center items-center w-screen sm:w-[calc(100vw-80px)]">
          <h1 className="text-center text-white">No Songs Played </h1>
        </div>
      )}
    </>
  );
}
