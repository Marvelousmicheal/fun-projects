import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-black overflow-hidden relative selection:bg-purple-500/30">
      
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] animate-pulse delay-75" />

      {/* Header */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex opacity-50">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-white/10 bg-black/20 backdrop-blur-md pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200/5 lg:p-4">
          A Siri Wanna Be
        </p>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 tracking-tighter">
          How can I help?
        </h1>
        <p className="text-zinc-400 text-lg max-w-md mx-auto">
          I'm listening. Just press the button below to get started with your new assistant.
        </p>
      </div>

      {/* Bottom Button (The "Send" / Action Button) */}
      <div className="z-10 mb-8 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <button 
          className="relative flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-white/10 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Activate Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </button>
      </div>
    </main>
  );
}
