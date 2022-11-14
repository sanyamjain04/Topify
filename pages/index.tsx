import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

export default function Home() {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
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
          content="Spotify Clone built with NEXTJS and TypeScript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
