import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import type { Session } from "next-auth";
import Layout from "../components/Layout";
import { TrackProvider } from "../hooks/trackContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <TrackProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </TrackProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
