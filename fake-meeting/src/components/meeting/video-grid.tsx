import VideoTile from "./video-tile";
import { participants } from "@/data/participantsData";


export default function VideoGrid() {
  return (
  <main className="flex-1 p-4 overflow-hidden">
    <div className="h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-fr">
        {
            participants.map((participant)=>(
            
                <VideoTile participant={participant}/>
           
            ))
        }
    </div>
  </main>
  )
}