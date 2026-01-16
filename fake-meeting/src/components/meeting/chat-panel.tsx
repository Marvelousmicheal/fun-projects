"use client";
import { cn } from "@/lib/utils";
import { Paperclip, Send, Smile, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
const messages = [
  {
    id: 1,
    sender: "Sarah Chen",
    initials: "SC",
    message: "Hey everyone! Can you see my screen?",
    time: "12:42 PM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    initials: "YO",
    message: "Yes, looks good! 👍",
    time: "12:43 PM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Mike Johnson",
    initials: "MJ",
    message: "Can we review the Q4 numbers first?",
    time: "12:44 PM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Emma Davis",
    initials: "ED",
    message: "Sure, I have the deck ready. Let me share.",
    time: "12:44 PM",
    isOwn: false,
  },
];
export default function ChatPanel({isOpen, onClose}: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState("");
  if (!isOpen) return null;
  const handleSend = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <>
      <div className="w-80 glass-dark h-full flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">In-call Messages</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex gap-3", msg.isOwn && "flex-row-reverse")}
            >
              {!msg.isOwn && (
                <div className="w-8 h-8 rounded-full bg-primary/30  flex items-center justify-center border border-primary/20 flex-shrink-0">
                  <span className="text-xs font-medium text-foreground">
                    {msg.initials}
                  </span>
                </div>
              )}
              <div
                className={cn(
                  "flex flex-col max-w-[75%]",
                  msg.isOwn && "items-end"
                )}
              >
                {!msg.isOwn && (
                  <span className="text-xs text-muted-foreground mb-1">
                    {msg.sender}
                  </span>
                )}
                <div
                  className={cn(
                    "px-3 py-2 rounded-2xl",
                    msg.isOwn
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary text-foreground rounded-tl-sm"
                  )}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 bg-secondary rounded-xl p-2">
            <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Paperclip className="w-5 h-5 text-muted-foreground" />
            </button>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) =>
                setNewMessage((e.target as HTMLInputElement).value)
              }
              placeholder="send a message"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none border-0 shadow-none"
            />
            <Button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Smile className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button
              onClick={handleSend}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
