import Image from "next/legacy/image";
import { useRecoilValue } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";

const CurrentTrack = () => {
  const currentTrack = useRecoilValue(playingTrackState);
  return (
    <div className="border-2">
      <h1 className="p-2">Current Track</h1>
      <section className="flex flex-col items-center justify-center">

        <div className="relative rounded-full overflow-hidden w-max">
          <Image
            src={currentTrack?.images?.coverart}
            width={320}
            height={320}
          />
        </div>

        <div className="w-1/2">
          <p className="whitespace-nowrap truncate font-bold text-lg">
            {currentTrack ? currentTrack?.title : "No active Song"}
          </p>
          <p className="truncate text-gray-300">
            {currentTrack?.subtitle ? currentTrack?.subtitle : "No active Song"}
          </p>
        </div>

        <div>
        </div>

      </section>
    </div>
  );
};

export default CurrentTrack;
