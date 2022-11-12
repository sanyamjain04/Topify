import { MdOutlineShortText } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import Dropdown from "./Dropdown";

type SearchProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selectedGenre: string;
  setSelectedGenre: Dispatch<SetStateAction<string>>;
};

function Search({ search, setSearch, selectedGenre ,setSelectedGenre}: SearchProps) {
  return (
    <div className="flex gap-2 mr-2">
      <div className="w-5/6 lg:max-w-[1150px] bg-[#1A1A1A] rounded-full overflow-hidden border-2 border-[#333333] p-1.5 px-5 flex items-center md:ml-2">
        <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse mr-1" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1A1A1A] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#FAFAFA] text-xs tracking-wider"
          placeholder="Search..."
        />

        <div className="items-center divide-dotted divide-x-2 divide-[#333333] ml-auto hidden lg:flex">
          <div className="flex space-x-2 pr-5">
            {["Rock", "Dance"].map((genre, i) => (
              <button
                key={i}
                className={`tag ${genre === selectedGenre && "text-green-500"}`}
                onClick={()=>setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5 text-[#CECECE] pl-4">
            <MdOutlineShortText className="text-2xl animate-pulse" />
            <span className="font-medium text-sm">Filters</span>
          </div>

        </div>
      </div>
      <div className="lg:hidden">
        <Dropdown />
      </div>
    </div>
  );
}

export default Search;
