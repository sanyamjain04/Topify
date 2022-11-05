import React from 'react';
import { Track } from '../../types/body.types';

interface TrackProps {
  play : boolean
  playingTrack: Track
}
const Track = ({ play, playingTrack }:TrackProps) => {
  const title = (playingTrack?.title)?.length > 20 ? (playingTrack?.title).slice(0,20) + "..." : playingTrack?.title
  return (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${play && 'animate-[spin_3s_linear_infinite]'} hidden sm:block h-16 w-16 mr-4`}>
      <img src={playingTrack?.images?.coverart} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="whitespace-nowrap text-white font-bold text-lg">
        {playingTrack?.title ? title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {playingTrack?.subtitle ? playingTrack?.subtitle : 'No active Song'}
      </p>
    </div>
  </div>
);}

export default Track;