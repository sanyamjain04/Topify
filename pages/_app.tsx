import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import { TrackProvider } from "../hooks/trackContext";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <TrackProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TrackProvider>
    </RecoilRoot>
  );
}
