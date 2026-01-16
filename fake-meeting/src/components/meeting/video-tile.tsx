import { cn } from "@/lib/utils";
import { Mic, MicOff, Pin } from "lucide-react";
import { Participant } from "@/types/meeting";
import Image from "next/image";

interface VideoTileProps {
  participant: Participant;
}

export default function VideoTile({ participant }: VideoTileProps) {
  const avatarSrc = participant.avatar ? `/image/${participant.avatar}.jpg` : "";

  return (
  <div
      className={cn(
        "relative bg-background rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300",
        participant.isSpeaking ? "ring-2 ring-primary" : "ring-1 ring-border"
      )}
    >
      {/* Video feed or Avatar */}
      {participant.videoUrl && participant.hasVideo ? (
        <video
          src={participant.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : participant.hasVideo && avatarSrc ? (
        /* Avatar image when video is "on" but no video URL */
        <Image
          src={avatarSrc}
          alt={participant.name}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        /* Avatar placeholder when video is off */
        <div className="flex flex-col items-center justify-center gap-3">
          {avatarSrc ? (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src={avatarSrc}
                alt={participant.name}
                width={96}
                height={96}
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center border border-primary/20">
              <span className="text-2xl md:text-3xl font-semibold text-foreground">
                {participant.initials}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Name badge */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-2">
          {participant.isMuted ? (
            <MicOff className="w-3.5 h-3.5 text-destructive" />
          ) : (
            <Mic className="w-3.5 h-3.5 text-success" />
          )}
          <span className="text-sm font-medium text-white">
            {participant.name}
            {participant.isYou && " (You)"}
          </span>
        </div>
      </div>

      {/* Pin indicator */}
      {participant.isPinned && (
        <div className="absolute top-3 right-3">
          <div className="glass p-2 rounded-lg">
            <Pin className="w-4 h-4 text-primary" />
          </div>
        </div>
      )}

      {/* Live indicator for video */}
      {participant.videoUrl && participant.hasVideo && (
        <div className="absolute top-3 left-3">
          <div className="bg-destructive/90 px-2 py-1 rounded text-xs font-medium text-destructive-foreground flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive-foreground animate-pulse" />
            LIVE
          </div>
        </div>
      )}
    </div>
  )
}

