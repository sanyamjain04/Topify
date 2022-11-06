import Search from "./Search";
import { useEffect, useState } from "react";
import { Track as TrackType } from "../types/body.types";
import Poster from "./Poster";
import Track from "./Track";
import { useRecoilState } from "recoil";
import { musicTrackState } from "../atoms/playerAtom";

interface BodyProps {
  chooseTrack: (track: TrackType) => void;
}

const Body = ({ chooseTrack }: BodyProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchresults] = useState<string[]>([]);
  const [musicTracks, setMusicTracks] =
    useRecoilState<TrackType[]>(musicTrackState);

  const genres = [
    "Classic",
    "House",
    "Electronic",
    "Minimal",
    "Chillout",
    "Techno",
    "Hip-hop",
    "Blues",
  ];

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "2e445e07b9mshede7d00d0b93695p127d1ajsn6e681578ac80",
  //       "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  //     },
  //   };

  //   fetch("https://shazam-core.p.rapidapi.com/v1/charts/world", options)
  //     .then((response) => response.json())
  //     .then((response) => setMusic(response))
  //     .catch((err) => console.error(err));

  // }, []);
  // console.log(music);

  return (
    <section className="bg-black ml-2 sm:ml-24 py-4 space-y-8 md:mr-2.5 w-[calc(100vw-110px)] md:max-w-6xl">
      <Search search={search} setSearch={setSearch} />
      <div className="flex flex-wrap gap-x-5 overflow-y-scroll scrollbar-hide md:h-[12.5rem] h-96 py-0 ml-2">
        {search.length === 0
          ? musicTracks
              .slice(0, 4)
              .map((track, i) => (
                <Poster key={i} track={track} chooseTrack={chooseTrack} />
              ))
          : "Loading"}
      </div>

      <div className="flex gap-x-8 md:relative ml-2 lg:ml-6">
        {/* Genres */}
        <div className="hidden lg:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            {genres.map((genre, i) => (
              <div key={i} className="genre">
                {genre}
              </div>
            ))}
          </div>
          <button className="whitespace-nowrap   text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
            All Genres
          </button>
        </div>

        <div className="pr-2">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>

          <div className="space-y-3 border-2 border-[#262626] rounded-2xl lg:p-3 bg-[#0D0D0D] overflow-y-scroll h-[370px]  md:h-[22.9rem] scrollbarThin sm:w-[600px]  md:w-[655px] lg:w-[780px]">
            {musicTracks.slice(4, musicTracks.length).map((track, i) => (
              <Track key={i} track={track} chooseTrack={chooseTrack} />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Body;
