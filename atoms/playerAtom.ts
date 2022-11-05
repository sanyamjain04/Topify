import { atom } from "recoil";
import { Track } from "../types/body.types";
import { musicTracksData } from '../data/musicTracks'

export const playState = atom({
  key: "playState",
  default: false,
});

export const playingTrackState = atom<Track>({
  key: "playingTrackState",
  default: undefined,
});

export const musicTrackState = atom<Track[]>({
  key: "MusicTrackState",
  default: [...musicTracksData]
});

export const recentlyPlayedTracks = atom<Track[]>({
  key: "recentlyPlayed",
  default: [],
});