import Search from "./Search";
import { useEffect, useState } from "react";
import { Track as TrackType } from "../types/body.types";
import Poster from "./Poster";
import Track from "./Track";
import {danceTracks, electronicTracks, hipPopTracks, houseTracks, musicTracksData, popTracks, rockTracks} from '../data'
import Link from "next/link";

const Body = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchresults] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [showHomePlaylist, setShowHomePlaylist] = useState<TrackType[]>(musicTracksData)

  const genres = {
     "House" : houseTracks ,
     "Electronic" : electronicTracks ,
     "Pop" : popTracks ,
     "Rock" : rockTracks ,
     "Dance" : danceTracks ,
     "Hip-Hop" : hipPopTracks ,
  };

  useEffect(()=>{
    if (selectedGenre in genres) {
      // @ts-ignore
      setShowHomePlaylist(genres[selectedGenre]);
    }
  },[selectedGenre])


  // if you want to fetch data from Api then uncomment the useEffect below
  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  // "X-RapidAPI-Key": process.env.NEXT_APP_RAPID_API_KEY,
  //       "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  //     },
  //   };

  //   fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
  //     .then((response) => response.json())
  //     .then((response) => setMusic(response))
  //     .catch((err) => console.error(err));

  // }, []);
  // console.log(music);

  // function selectGenre(genre: any) {
  //   setCurrentPlaylist(genre.playList);
  //   setSelectedGenre(genre.name);
  // }

  return (
    <section className="bg-black w-full md:w-[calc(100vw-120px)] ml-2 sm:ml-24 py-4 space-y-8 md:mr-2.5 md:max-w-[79rem] lg:w-4/5">
      <Search search={search} setSearch={setSearch} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>
      <div>
        <div className="flex flex-wrap gap-x-5 scrollbar-hide py-0 ml-2 w-full h-full">
          {search.length === 0
            ? showHomePlaylist
                .slice(0, 4)
                .map((track, i) => (
                  <Poster key={i} track={track} playlist={showHomePlaylist} />
                ))
            : "Loading"}
        </div>
      </div>

      <div className="flex gap-x-8 md:relative ml-2 lg:ml-6">
        {/* Genres */}
        <div className="hidden xlg:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            {Object.keys(genres).map((genre, i) => (
              <div
                key={i}
                className={`genre ${
                  genre === selectedGenre && "text-green-500"
                }`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </div>
            ))}
          </div>
          <Link href={'/explore'}>
            <button className="whitespace-nowrap text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out"
            >
              All Genres
            </button>
          </Link>
        </div>

        <div className="pr-2 w-full">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>

          <div className="border-2 border-[#262626] rounded-2xl overflow-y-scroll scrollbarThin h-[380px]">
            {showHomePlaylist
              .slice(4, showHomePlaylist.length)
              .map((track, i) => (
                <Track key={i} track={track} playlist={showHomePlaylist} />
              ))}
          </div>
          <div className="h-20" />
        </div>
      </div>
    </section>
  );
};

export default Body;
