import {
  Check,
  Mic,
  MicOff,
  Pencil,
  Trash2,
  Upload,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { useState } from "react";
import { Participant } from "@/types/meeting";
import Image from "next/image";

// Sample data for demo
const sampleVideos = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
];

interface ParticipantCardProps {
  participant: Participant;
  onRemove: () => void
  onUpdate: (updates: Partial<Participant>) => void
}

export default function ParticipantCard({ participant,onUpdate,onRemove }: ParticipantCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(participant.name);
  const [showVideoOptions, setShowVideoOptions] = useState(false);

  const handleVideoSelect = (videoUrl: string) => {
    // This will be implemented when we have state management for individual participant videos
    console.log("Selected video:", videoUrl);
    setShowVideoOptions(false);
  };

  const avatarSrc = participant.avatar ? `/image/${participant.avatar}.jpg` : "";
  const handleSave = () => {
    const initials = editName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0,2)
  onUpdate({name: editName, initials})
  setIsEditing(false)
  }


  return (
   
      <div className="bg-primary  rounded-[8px] p-4 ">
        <div className="flex items-start gap-6">
          {/* Avatar / Video preview */}
          <div className="relative">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-800">
              {participant.videoUrl ? (
                <video
                  src={participant.videoUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={participant.name}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <span className="text-3xl font-light text-black tracking-wider">
                    {participant.initials}
                  </span>
                </div>
              )}

              {/* Video badge */}
              {participant.videoUrl && (
                <div className="absolute bottom-2 right-2 bg-red-600 px-3 py-1.5 rounded-lg text-[9px] font-semibold text-white tracking-widest">
                  ● LIVE
                </div>
              )}
            </div>
            
            {/* Online indicator */}
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-emerald-500 rounded-full border-[3px] border-zinc-950"></div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0  ">
            {isEditing ? (
              <div className="flex items-center gap-3 relative mb-6 ">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-2 py-1 rounded-[6px] bg-zinc-900 text-white text-base border border-zinc-800 focus:outline-none focus:border-zinc-700 transition-colors"
                  autoFocus
                />
                <div className="flex absolute -right-5">

                <button onClick={handleSave} className="px-2 py-2 bg-primary hover:bg-emerald-500 text-white transition-colors duration-300">
                  <Check className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2 py-2  bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors duration-300"
                >
                  <X className="w-3 h-3" />
                </button>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <h3 className="font-medium text-black text-2xl truncate mb-2 tracking-tight">
                  {participant.name}
                </h3>
                <p className="text-red-500 text-sm font-normal tracking-wide uppercase">Active Now</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                className={
                  participant.isMuted
                    ? "px-3 py-2 rounded-[4px] bg-white text-red-400 "
                    : "px-3 py-2 rounded-[4px] bg-white text-black "
                }
              >
                {participant.isMuted ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              
              <button
                className={
                  participant.hasVideo
                    ? "px-3 py-2 rounded-[4px] bg-white text-blue-400"
                    : "px-3 py-2 rounded-[4px] bg-white text-zinc-500 "
                }
              >
                {participant.hasVideo ? (
                  <Video className="w-4 h-4" />
                ) : (
                  <VideoOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1">
            <button onClick={()=> setIsEditing(true)} className="p-2 rounded-2xl ">
              <Pencil className="w-4 h-4 text-black hover:text-white cursor-pointer transition-colors" />
            </button>
            <button className="p-2 rounded-2xl ">
              <Upload className="w-4 h-4 text-black hover:text-white cursor-pointer transition-colors" />
            </button>
            <button onClick={onRemove} className="p-2 rounded-2xl hover:text-white cursor-pointer transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video options dropdown */}
        {showVideoOptions && (
          <div className="mt-6 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <p className="text-sm text-zinc-500 mb-4 font-normal tracking-wide">
              Add a video feed to make this participant look active:
            </p>
            <div className="grid grid-cols-3 gap-4">
              {sampleVideos.map((url, i) => (
                <button
                  key={i}
                  onClick={() => handleVideoSelect(url)}
                  className="relative aspect-video rounded-xl overflow-hidden border-2 border-zinc-800 hover:border-zinc-600 transition-all duration-300"
                >
                  <video
                    src={url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors duration-300" />
                </button>
              ))}
            </div>
            {participant.videoUrl && (
              <button className="mt-4 text-sm text-red-400 hover:text-red-300 font-normal tracking-wide hover:underline transition-colors">
                Remove video feed
              </button>
            )}
          </div>
        )}
      </div>
  
  );
}