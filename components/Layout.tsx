import MusicPlayer from "./musicplayer/index";
import { currentPlaylistState, playingTrackState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSession } from "next-auth/react";

type ReorderProps = (
  list: Track[],
  startIndex: number,
  endIndex: number
) => Track[];

const Layout = ({ children }: any) => {
  const playingTrack = useRecoilValue<Track>(playingTrackState);
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(currentPlaylistState);
  const router = useRouter();
  
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });
  if (router.pathname === "/auth/signin") return children;


  const reorder: ReorderProps = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    const startIndex = source.index;
    const endIndex = destination.index;

    const newList = reorder(currentPlaylist, startIndex, endIndex);

    setCurrentPlaylist(newList);
  };

  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen min-w-full bg-black">
        <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>

        {playingTrack && (
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <MusicPlayer />
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;
