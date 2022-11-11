import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { currentPlaylistState } from "../atoms/playerAtom";
import { Track as TrackType } from "../types/body.types";
import Track from "./Track";

const CurrentPlaylistPlayer = () => {
  const currentPlaylist = useRecoilValue<TrackType[]>(currentPlaylistState);
  return (
    <>
      <h1 className="p-2">Current Playlist </h1>
      <div className="m- overflow-y-scroll scrollbarThin">
        <Droppable droppableId="children">
          {(provided) => (
            <div
              className="border-2 border-[#262626] rounded-2xl overflow-y-scroll w-full h-full max-w-2xl max-h-[78vh] scrollbarThin"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentPlaylist.map((track: TrackType, i: number) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Track playlist={currentPlaylist} track={track} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default CurrentPlaylistPlayer;
