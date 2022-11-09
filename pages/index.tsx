import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { likeTracksState, recentlyPlayedTracks } from "../atoms/playerAtom";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";
import { Track } from "../types/body.types";
import { recentlyPlayedLRU } from "../utils/cache";

export default function Home() {
  const [recentlyPlayed, setRecentlyPlayed] = useRecoilState(recentlyPlayedTracks);
  const [likedTracks, setLikedTracks] = useRecoilState<Track[]>(likeTracksState);
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  useEffect(() => {
    setLikedTracks(JSON.parse(localStorage.getItem("likedPlaylist")!));
  }, []);

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentlyPlayed")!);
    if (data) {
      data.forEach((track: Track) => {
        recentlyPlayedLRU.set(track.key, track);
      });
      setRecentlyPlayed(recentlyPlayedLRU.get());
    }
  }, []);

  // Loading animation...
  if (status === "loading") {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Spotify </title>
        <meta
          name="description"
          content="Spotify Clone built with NEXTJS and Typescript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
