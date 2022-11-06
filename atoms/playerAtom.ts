import { atom } from "recoil";
import { Track } from "../types/body.types";
import { musicTracksData } from '../data/musicTracks'

export const playState = atom({
  key: "1",
  default: false,
});

export const playingTrackState = atom<Track>({
  key: "2",
  default: undefined,
});

export const musicTrackState = atom<Track[]>({
  key: "3",
  default: [...musicTracksData]
});

export const recentlyPlayedTracks = atom<Track[]>({
  key: "4",
  default: [],
});