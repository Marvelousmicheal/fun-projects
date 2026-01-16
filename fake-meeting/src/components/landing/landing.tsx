"use client";
import { ArrowRight, Plus, Settings, Users, Video } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { fakeSponsors } from "@/data/landingData";
import ParticipantCard from "./participant-card";
import AddParticipant from "./add-participant";
import { Participant } from "@/types/meeting";
import { participants as initialParticipants } from "@/data/participantsData";

export default function Landing() {
  const [showSponsors, setShowSponsors] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participantList, setParticipantList] = useState<Participant[]>(initialParticipants);
  const handleStartClick = () => {
    setShowSponsors(false);
  };

  const addParticipant = (newParticipant: Omit<Participant, 'id'>) => {
    setParticipantList(prev => [
      ...prev,
      { ...newParticipant, id: `participant-${prev.length + 1}` }
    ]);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <header className="flex items-center bg-lime-500/70 justify-center pt-4 px-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-6xl rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">
                    F
                  </span>
                </div>
                <span className="text-xl font-semibold text-foreground">
                  FakeMeeting
                </span>
              </div>

              {/* Funny Nav Links */}
              <nav className="hidden lg:flex">
                <ul className="flex items-center gap-6 text-sm font-medium">
                  <li>
                    <a
                      href="#"
                      className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      Escape Plans
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      Jargon Glossary
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      Blame Generator
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Launch Button */}
              <div className="flex items-center gap-4">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-semibold">
                  Launch Demo
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex items-center justify-center py-12 px-4 bg-lime-500/70">
          <div className="max-w-7xl text-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-[150px] font-bold text-black/75 dark:text-white mb-4">
                Fake Your Meeting
              </h1>
              <p className="text-lg text-black dark:text-white max-w-2xl mx-auto">
                Look busy, impress your boss, or just take a nap. We provide the
                unimpeachable alibi of a full-calendar day. You're welcome.
              </p>
            </div>
            <button
              onClick={handleStartClick}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-md text-lg font-semibold transition-colors"
            >
              Start Faking Now!
            </button>
            {/* "Sponsors" Section */}
            {showSponsors && (
              <div className="mt-16 w-full text-center">

                <div className="rounded-[4px] p-6 bg-white dark:bg-gray-900">
                 
                  <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">
                    Trusted by industry leaders who definitely exist
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {fakeSponsors.map((sponsor, index) => (
                      <div
                        key={sponsor.name}
                        className="glass rounded-xl p-4 hover:border-primary/30 transition-all group animate-fade-in cursor-default"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <sponsor.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-xs font-medium text-foreground">
                            {sponsor.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground italic hidden md:block">
                            {sponsor.tagline}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-xs text-muted-foreground/50">
                    * These companies are 100% fictional. Any resemblance to
                    your actual workplace is purely coincidental (but also, are
                    you okay?)
                  </p>
                </div>
              </div>
            )}{" "}
          </div>
        </main>
      </div>
      <div>
        {/* New Section with Meeting Settings, Join Button, Stats */}
        <div className="py-12 px-4 w-full">
          <div className="max-w-7xl bg-lime-500/40 mx-auto">
            <div className="grid lg:grid-cols-3 ">
              {/* Settings Panel */}
              <div className="lg:col-span-1 bg-white space-y-6 p-4 rounded-[2px]">
                <div className="rounded-2xl ">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Meeting Settings
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Meeting Name
                      </label>
                      <Input type="text" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Your Display Name
                      </label>
                      <Input type="text" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Meeting ID
                      </label>
                      <Input type="text" />
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full py-2 px-6 rounded-[4px] bg-black text-white font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-3">
                  <Video className="w-5 h-5" />
                  Enter Meeting Room
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Stats */}
                <div className=" rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Participants
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      {participantList.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 ">
                <div className="rounded-[4px] p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary">
                        <Users className="w-5 h-5 text-black" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Fake Participants
                      </h2>
                    </div>
                    <button onClick={()=> setIsModalOpen(true)} className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {}
                  <div className="grid md:grid-cols-2 gap-4">
                    {participantList.map(participant => (
                      <ParticipantCard onUpdate={} onRemove={} key={participant.id} participant={participant} />
                    ))}
                  </div>

               
                <div className="flex flex-1 items-end mt-3 ">

                  <div className=" p-4 rounded-xl bg-primary/50 border border-primary">
                    <p className="text-sm text-foreground">
                      <strong className="text-red-500">Pro tip:</strong> Click
                      the upload icon on any participant to add a looping video
                      feed. This makes your fake meeting look super realistic!
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddParticipant 
      isOpen={isModalOpen}
      onClose={()=> setIsModalOpen(false)}
      onAddParticipant={addParticipant}
      />
    </>
  );
}
