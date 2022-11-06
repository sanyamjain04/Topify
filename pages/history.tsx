import Head from "next/head";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify </title>
        <meta
          name="description"
          content="Spotify Clone built with NEXTJS and Typescript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
