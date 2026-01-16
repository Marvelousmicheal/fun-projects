"use client"
import { ArrowLeft, ChevronDown, Copy, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function MeetingHeader() {
    
    const router = useRouter()
    const copyMeetingId = () => {
        navigator.clipboard.writeText("we the best")
        toast.success("Meeting ID copied to clipboard")
    }
  return (
   <>
    <header className="glass-dark py-3 px-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-lg hover:bg-secondary transition-colors mr-2"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-sm font-bold text-primary-foreground">M</span>
        </div>
        <span className="font-semibold text-foreground hidden sm:inline">
          asfvaravbratbeasbtstb
        </span>
      </div>

      {/* Meeting info */}
      <div className="flex items-center gap-4">
        <button
          onClick={copyMeetingId}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors group"
        >
          <Shield className="w-4 h-4 text-success" />
          <span className="text-sm text-muted-foreground">
            Meeting ID:{" "}
            <span className="text-foreground font-medium">35434535</span>
          </span>
          <Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Actions */}
         <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              <span className="hidden sm:inline">Share</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Share Meeting</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText("we will do that");
                toast.success("Meeting link copied!");
              }}
            >
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem
              
            >
              Share to Twitter
            </DropdownMenuItem>
            <DropdownMenuItem
             
            >
              Share to Facebook
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
   </>
  )
}

