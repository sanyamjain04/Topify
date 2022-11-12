import Poster from "../components/Poster";
import { Track } from "../types/body.types";
import {
  danceTracks,
  electronicTracks,
  hipPopTracks,
  houseTracks,
  musicTracksData,
  popTracks,
  rockTracks,
} from "../data";
import Head from "next/head";

const Explore = () => {
  const playlists = [
    { name: "Dance Tracks", playlist: danceTracks },
    { name: "Electronic Tracks", playlist: electronicTracks },
    { name: "Hip Pop Tracks", playlist: hipPopTracks },
    { name: "House Tracks", playlist: houseTracks },
    { name: "Top Tracks", playlist: musicTracksData },
    { name: "Pop Tracks", playlist: popTracks },
    { name: "Rock Tracks", playlist: rockTracks },
  ];

  return (
    <>
      <Head>
        <title>Spotify - Explore </title>
        <meta
          name="description"
          content="Spotify Clone built with NEXTJS and Typescript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="sm:ml-24 p-2 w-full sm:w-[calc(100vw-120px)] mb-24">
        <div className="flex flex-col sm:w-[calc(100vw-120px)]">
          <h1 className="text-xl text-green-500 font-bold mx-auto w-full bg-black z-10 top-0 p-2 fixed">
            Explore Tracks
          </h1>
          <div className="mt-10" />

          {playlists.map((playlist, index) => (
            <div key={index} className="flex flex-col w-full">
              <h1 className="p-2">{playlist.name}</h1>
              <div className="m- overflow-y-scroll scrollbarThin">
                <div className="flex gap-4 p-1 h-[150px] sm:h-[220px] min-w-max">
                  {playlist.playlist.map((track: Track, i: number) => (
                    <Poster
                      track={track}
                      key={i}
                      playlist={playlist.playlist}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Explore;
