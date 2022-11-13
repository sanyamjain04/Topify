import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { currentPlaylistState, playingTrackState } from "../atoms/playerAtom";
import { Track as TrackType } from "../types/body.types";
import Track from "./Track";

const CurrentPlaylistPlayer = () => {
  const currentPlaylist = useRecoilValue<TrackType[]>(currentPlaylistState);
  const currentTrack = useRecoilValue(playingTrackState)

  return (
    <>
      <h1 className="p-2">{ currentTrack ? 'Up Next' : 'Choose Track'} </h1>
      <div className="m- overflow-y-scroll scrollbarThin">
        <Droppable droppableId="children">
          {(provided) => (
            <div
              className="border-2 border-[#262626] rounded-2xl overflow-y-scroll w-full h-[80vh] max-w-2xl h- md:max-h-[78vh] scrollbarThin"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentPlaylist.map((track: TrackType, i: number) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {(provided) => (
                    <div className=""
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Track playlist={currentPlaylist} track={track} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default CurrentPlaylistPlayer;
