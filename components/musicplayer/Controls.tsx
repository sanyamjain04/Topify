import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";
import { Track } from "../../types/body.types";

interface ControlProps {
  play: boolean;
  repeat: boolean;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
  setRepeat: Dispatch<SetStateAction<boolean>>;
  musicTracks: Track[];
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

const Controls = ({
  play,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  musicTracks,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: ControlProps) => {
  const handleRepeat = () => {
    if (shuffle) setShuffle(false);
    setRepeat(!repeat);
  };

  const handleShuffle = () => {
    if (repeat) setRepeat(false);
    setShuffle(!shuffle);
  };

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat
        size={20}
        color={repeat ? "red" : "white"}
        onClick={handleRepeat}
        className="hidden sm:block cursor-pointer"
      />
      {musicTracks?.length && (
        <MdSkipPrevious
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handlePrevSong}
        />
      )}
      {play ? (
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      )}
      {musicTracks?.length && (
        <MdSkipNext
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handleNextSong}
        />
      )}
      <BsShuffle
        size={20}
        color={shuffle ? "red" : "white"}
        onClick={handleShuffle}
        className="hidden sm:block cursor-pointer"
      />
    </div>
  );
};

export default Controls;
