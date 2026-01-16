import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import ControlButton from "./control-button";
import {
  Hand,
  MessagesSquare,
  Mic,
  MicOff,
  Monitor,
  MoreHorizontal,
  PhoneOff,
  Settings,
  User,
  Video,
  VideoOff,
} from "lucide-react";

interface ControlBarProps {
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  isChatOpen: boolean;
  isParticipantsOpen: boolean;
}

export default function ControlBar({
  onToggleChat,
  onToggleParticipants,
  isChatOpen,
  isParticipantsOpen,
}: ControlBarProps) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [meetingTime, setMeetingTime] = useState("12:45");

  const handleleaveMeeting = () => {
    router.push("/");
  };

  return (
    <>
      <div className="glass-dark py-4 px-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">
                {meetingTime}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">|</span>
            <span className="text-sm font-medium text-foreground">
              {"config.meetingName"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ControlButton
              icon={isMuted ? MicOff : Mic}
              label={isMuted ? "unmute" : "Mute"}
              isActive={!isMuted}
              onClick={() => setIsMuted(!isMuted)}
            />
            <ControlButton
              icon={isVideoOn ? Video : VideoOff}
              label={isVideoOn ? "Turn off camera" : "Turn on camera"}
              isActive={isVideoOn}
              onClick={() => setIsVideoOn(!isVideoOn)}
            />
            <ControlButton
              icon={Monitor}
              label={"Share screen"}
              isActive={isScreenSharing}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            />
            <ControlButton
              icon={Hand}
              label={isHandRaised ? "Lower hand" : "Raise hand"}
              isActive={isHandRaised}
              onClick={() => setIsHandRaised(!isHandRaised)}
            />
            <div className="w-px h-8 bg-border mx-2" />

            <ControlButton
              icon={User}
              label={"Participants"}
              isActive={isParticipantsOpen}
              onClick={onToggleParticipants}
              badge={30}
            />
            <ControlButton
              icon={MessagesSquare}
              label={"Chat"}
              isActive={isChatOpen}
              onClick={onToggleChat}
              badge={3}
            />

            <div className="w-px h-8 bg-border mx-2" />

            <ControlButton
              icon={PhoneOff}
              label="Leave meeting"
              isDanger
              onClick={handleleaveMeeting}
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
          <ControlButton icon={Settings} label="Settings" />
          <ControlButton icon={MoreHorizontal} label="More options" />
        </div>
        </div>
      </div>
    </>
  );
}
