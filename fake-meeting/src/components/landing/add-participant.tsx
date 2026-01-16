import { UserPlus, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Participant } from "@/types/meeting";
import Image from "next/image";
import { toast } from "sonner";

const availableAvatarNames = ["image1", "image2", "image3", "image4"];

interface AddParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddParticipant: (participant: Omit<Participant, "id">) => void;
}

export default function AddParticipant({
  isOpen,
  onClose,
  onAddParticipant,
}: AddParticipantModalProps) {
  if (!isOpen) return null;

  const [participantName, setParticipantName] = useState("");
  const [selectedAvatarName, setSelectedAvatarName] = useState<
    string | undefined
  >();

  const handleAddParticipant = () => {
    if (participantName.trim() === "") {
      toast.error("Please enter a Participant name");
      return;
    }
    const newParticipant: Omit<Participant, "id"> = {
      name: participantName,
      initials: participantName.charAt(0).toUpperCase(),
      avatar: selectedAvatarName,
      isMuted: false,
      hasVideo: true,
      isSpeaking: false,
      isPinned: false,
      isHost: false,
      isYou: false,
    };
    onAddParticipant(newParticipant);
    setParticipantName("");
    setSelectedAvatarName(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-primary rounded-2xl w-full max-w-5xl p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white">
              <UserPlus className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Add Participant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg cursor-pointer hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-base font-semibold text-foreground mb-2">
              Name
            </label>
            <Input
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              type="text"
              placeholder="Enter participant name"
              className="w-full px-4 py-3 rounded-[6px] bg-secondary text-foreground placeholder:text-muted-foreground border-1 border-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-foreground mb-2">
              Avatar (optional)
            </label>
            <div className="grid grid-cols-4 gap-3 ">
              {availableAvatarNames.map((avatarName) => (
                <button
                  key={avatarName}
                  onClick={() =>
                    setSelectedAvatarName(
                      selectedAvatarName === avatarName ? undefined : avatarName
                    )
                  }
                  className={`relative cursor-pointer aspect-square rounded-xl overflow-hidden transition-all ${
                    selectedAvatarName === avatarName
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:opacity-80"
                  }`}
                >
                  <Image
                    src={`/image/${avatarName}.jpg`}
                    alt="Avatar option"
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-[6px] bg-secondary text-foreground cursor-pointer font-medium hover:bg-muted transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddParticipant}
            disabled={!participantName.trim()}
            className="flex-1 py-3 px-4 rounded-[6px] bg-black text-primary font-medium hover:bg-black/90 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Participant
          </Button>
        </div>
      </div>
    </div>
  );
}
