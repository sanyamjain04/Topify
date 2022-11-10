import { useRecoilValue } from "recoil";
import { recentlyPlayedTracks } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import Body from "./Body";
import Right from "./Right";

const Dashboard = () => {
  const recentlyPlayed = useRecoilValue<Track[]>(recentlyPlayedTracks);

  return (
    <>
      <Body />
      <Right recentlyPlayed={recentlyPlayed} />
    </>
  );
};

export default Dashboard;
