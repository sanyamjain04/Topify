import { atom } from "recoil";
import { Track } from "../types/body.types";

export const playState = atom({
  key: "playState",
  default: false,
});

export const playingTrackState = atom<Track>({
  key: "playingTrackState",
  default: undefined,
});