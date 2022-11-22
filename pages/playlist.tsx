import { useRecoilValue } from "recoil";
import { likeTracksState } from "../atoms/playerAtom";
import { Track as TrackType } from "../types/body.types";
import Head from "next/head";
import Track from "../components/Track";

const Playlist = () => {
  const likedTracks = useRecoilValue<TrackType[]>(likeTracksState);

  return (
    <div className="md:w-[calc(100vw-120px)] w-full">

      <Head>
        <title>Topify - Liked Playlist</title>
      </Head>

      <section className="sm:ml-24 p-2 w-full">
        <div className="flex flex-col w-full">

          {likedTracks.length > 0 ? (
            <div>
              <h1 className="text-xl text-green-500 font-bold mx-auto w-full bg-black z-10 top-0 p-2 fixed">Liked Playlist </h1>

              <div className="mt-10 overflow-y-scroll scrollbarThin ">
                <div className="flex flex-col gap-3 p-1 h-[78vh] min-w-max border-2 border-[#262626] rounded-2xl overflow-y-scroll scrollbarThin">
                  {likedTracks.map((track: TrackType, i: number) => (
                    <Track track={track} key={i} playlist={likedTracks} />
                  ))}
                </div>
              </div>

            </div>
          ): (
            <div className="flex items-center justify-center">
              <h1 className="text-white">You have not liked any Track.</h1>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Playlist;
