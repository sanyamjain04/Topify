import MusicPlayer from "./musicplayer/index";
import { playingTrackState } from "../atoms/playerAtom";
import { Track } from "../types/body.types";
import { useRecoilState } from "recoil";
import React, { ReactNode } from 'react';
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  const [playingTrack, setPlayingTrack] =
    useRecoilState<Track>(playingTrackState);

  return (
    <main className="flex min-h-screen min-w-screen bg-black lg:pb-24">
      <Sidebar />

      {children}

      {playingTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <MusicPlayer />
        </div>
      )}
    </main>
  );
};

export default Layout;
