import Body from "./Body";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body
      // chooseTrack={chooseTrack} 
      // spotifyApi={spotifyApi}
       />
      {/* <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} /> */}

      {/* {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )} */}
    </main>
  );
};

export default Dashboard;
