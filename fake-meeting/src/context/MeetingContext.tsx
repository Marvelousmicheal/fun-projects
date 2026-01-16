import {createContext, useContext, useState, ReactNode} from "react"
import { MeetingConfig, Participant, defaultParticipants} from "@/types/meeting"

interface MeetingContextType{
    config: MeetingConfig
    updateConfig: (config: Partial<MeetingConfig>) => void
    updateParticipant: (id: string, updates: Partial<Participant>) => void
    addParticipant: (participant: Participant) => void
    removeParticipant: (id: string) => void
}
const defaultConfig: MeetingConfig = {
    meetingName: "Team Standup",
    meetingId:"456-467-72453",
    yourName:"You",
    participants:defaultParticipants
}
const MeetingContext = createContext<MeetingContextType | undefined>(undefined)

export const MeetingProvider = ({children}:{children: ReactNode}) => {
    const [config, setConfig] = useState<MeetingConfig>(defaultConfig)

    const updateConfig = (update: Partial<MeetingConfig>) => {
        setConfig((prev)=> ({...prev, ...update}))

    }
    const updateParticipant = (id: string, updates: Partial<Participant>)=>{
        setConfig((prev)=>({
            ...prev, 
            participants: prev.participants.map((p)=> 
                p.id === id? {...p, ...updates}:p
        ),
    }))
    }

}
