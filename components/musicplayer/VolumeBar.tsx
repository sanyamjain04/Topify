import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { Dispatch, SetStateAction } from "react";

interface VolumeProps {
  value : number
  min : number
  max: number
  onChange: (event:any)=>void
  setVolume: Dispatch<SetStateAction<number>>
}

const VolumeBar = ({ value, min, max, onChange, setVolume }:VolumeProps) => (
  <div className="flex group md:flex-1 items-center justify-end">
    {value <= 1 && value > 0.5 && <BsFillVolumeUpFill  className='hover:bg-[#282727]' size={25} color="#FFF" onClick={() => setVolume(0)} />}
    {value <= 0.5 && value > 0 && <BsVolumeDownFill className='hover:bg-[#282727]' size={25} color="#FFF" onClick={() => setVolume(0)} />}
    {value < 0.005 && <BsFillVolumeMuteFill className='hover:bg-[#282727]' size={25} color="#FFF" onClick={() => setVolume(1)} />}
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2 hidden absolute -top-8 -rotate-90 -right-8 group-hover:inline md:inline md:static md:rotate-0"
    />
  </div>
);

export default VolumeBar;