import { Mic, MicOff, MoreVertical, Video, VideoOff, X } from "lucide-react";
import { Participant } from "@/types/meeting";



interface ParticipantListProps{
  isOpen: boolean
  onClose: () => void
}
const dummyParticipant: Participant = {
  id: "dummy-id",
  name: "Dummy Participant",
  initials: "DP",
  avatar: "avatar-sarah", // Using a key that can be found in a simple avatarMap
  videoUrl: "",
  isMuted: false,
  hasVideo: true,
  isSpeaking: false,
  isPinned: false,
  isHost: false,
  isYou: true,
};

const fakeAvatarMap = {
  "avatar-sarah": "/image/image1.jpg",
  "avatar-mike": "/image/image2.jpg",
};

const allParticipants: Participant[] = [
  dummyParticipant,
  {
    id: "2",
    name: "Another Participant",
    initials: "AP",
    avatar: "avatar-mike",
    isMuted: true,
    hasVideo: false,
    isSpeaking: false,
    isPinned: false,
    isHost: false,
    isYou: false,
  },
];



export default function ParticipantList({isOpen, onClose}:ParticipantListProps) {
  if(!isOpen) return null
  return (
<div className="w-80 glass-dark h-full flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-foreground">
          Participants ({allParticipants.length})
        </h2>
        <button
        onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Participants list */}
      <div className="flex-1 overflow-y-auto p-2">
        {allParticipants.map((participant) => {
          const avatarSrc = participant.avatar
            ? fakeAvatarMap[participant.avatar as keyof typeof fakeAvatarMap]
            : null;

          return (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center border border-primary/20">
                    <span className="text-sm font-medium text-foreground">
                      {participant.initials}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {participant.name}
                </p>
                {participant.isHost && (
                  <span className="text-xs text-primary">Host</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {participant.isMuted ? (
                  <MicOff className="w-4 h-4 text-destructive" />
                ) : (
                  <Mic className="w-4 h-4 text-success" />
                )}
                {participant.hasVideo ? (
                  <Video className="w-4 h-4 text-success" />
                ) : (
                  <VideoOff className="w-4 h-4 text-muted-foreground" />
                )}
                <button className="p-1 rounded hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-border">
        <button className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Invite Participants
        </button>
      </div>
    </div>
  )
}

