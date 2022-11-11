import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { likeTracksState } from "../atoms/playerAtom";
import Poster from "../components/Poster";
import { Track } from "../types/body.types";
import Head from "next/head";

const Playlist = () => {
  const [likedTracks, setLikedTracks] = useRecoilState<Track[]>(likeTracksState);

  useEffect(() => {
    setLikedTracks(JSON.parse(localStorage.getItem("likedPlaylist")!));
  }, []);

  return (
    <div className="md:w-[calc(100vw-120px)]">
      <Head>
        <title>Spotify - Playlist</title>
      </Head>

      <section className="sm:ml-24 p-2 w-full">
        <div className="flex flex-col w-full">
          {likedTracks && (
            <>
              <h1 className="p-2">Liked Playlist </h1>
              <div className="m- overflow-y-scroll scrollbarThin">
                <div className="flex gap-3 p-1 h-[220px] min-w-max">
                  {likedTracks.map((track: Track, i: number) => (
                    <Poster track={track} key={i} playlist={likedTracks} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Playlist;
