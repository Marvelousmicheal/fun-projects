"use client"
import ChatPanel from "@/components/meeting/chat-panel";
import MeetingHeader from "@/components/meeting/meeting-header";
import ParticipantList from "@/components/meeting/participant-list";
import VideoGrid from "@/components/meeting/video-grid";
import { useState } from "react";
import ControlBar from "./control-bar";

export default function MeetingClient() {
  const [isChatOpen, setIsChatOpen] = useState(false)
   const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

   const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
    if(!isChatOpen) setIsParticipantsOpen(false)
   }
  const toggleParticipants = () => {
    setIsParticipantsOpen(!isParticipantsOpen)
    if(!isParticipantsOpen) setIsChatOpen(false)
  }
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <MeetingHeader/>
       <div className="flex-1 flex overflow-hidden">

      <VideoGrid/>
      <ParticipantList isOpen={isParticipantsOpen} onClose={()=> setIsParticipantsOpen(false)} />
      <ChatPanel isOpen={isChatOpen} onClose={()=> setIsChatOpen(false)}/>
       </div>
      <ControlBar
      onToggleChat={toggleChat}
      onToggleParticipants={toggleParticipants}
      isChatOpen={isChatOpen}
      isParticipantsOpen={isParticipantsOpen}
      />
      </div>
  );
}
