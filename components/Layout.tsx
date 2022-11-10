import MusicPlayer from "./musicplayer/index";
import { playingTrackState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import { useRecoilValue } from "recoil";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const playingTrack = useRecoilValue<Track>(playingTrackState);

  if (router.pathname === "/auth/signin") return children;

  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen min-w-full bg-black">
        {children}

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
