import MusicPlayer from "./musicplayer/index";
import { likeTracksState, playingTrackState, recentlyPlayedTracks } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React, { useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { DragDropContext } from "react-beautiful-dnd";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { recentlyPlayedLRU } from "../utils/cache";
import TrackContext from "../hooks/trackContext";

const Layout = ({ children }: any) => {
  const playingTrack = useRecoilValue<Track>(playingTrackState);
  const  [likedTracks, setLikedTracks] = useRecoilState(likeTracksState);
  const setRecentlyPlayed = useSetRecoilState(recentlyPlayedTracks);
  const {onDragEnd} = useContext(TrackContext)
  const router = useRouter();
  
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });
  
  useEffect(()=>{
    const likedTrackLS = JSON.parse(localStorage.getItem("likedPlaylist")!)
    if(likedTrackLS){
      setLikedTracks(()=>likedTrackLS)
    }
  },[])

  useEffect(()=>{
    if(likedTracks.length > 0) {
      localStorage.setItem("likedPlaylist", JSON.stringify(likedTracks))
    }
  },[likedTracks])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentlyPlayed")!);
    if (data) {
      data.forEach((track: Track) => {
        recentlyPlayedLRU.set(track.key, track);
      });
      setRecentlyPlayed(recentlyPlayedLRU.get());
    }
  }, []);

  if (router.pathname === "/auth/signin") return children;

  // Loading animation...
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen min-w-full bg-black">
        <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>

        {playingTrack && (
          <div className="fixed bottom-14 sm:bottom-0 left-0 right-0 z-50">
            <MusicPlayer />
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;
