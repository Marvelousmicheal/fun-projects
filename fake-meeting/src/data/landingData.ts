import { Clock, Zap, Moon, Skull, Coffee, HeartCrack, DoorOpen, Briefcase, Shield, Image } from "lucide-react";

export const fakeSponsors = [
  { name: "Procrastinate Inc.", icon: Clock, tagline: "Tomorrow's deadlines, today's problem" },
  { name: "BurnoutOS", icon: Zap, tagline: "Work harder, not smarter™" },
  { name: "MidnightOil Labs", icon: Moon, tagline: "Sleep is for the weak" },
  { name: "SoulCrush Corp", icon: Skull, tagline: "Synergizing your potential away" },
  { name: "OverCaffeinated", icon: Coffee, tagline: "Your 7th cup won't hurt" },
  { name: "QuietQuitting.io", icon: HeartCrack, tagline: "Doing the bare minimum, beautifully" },
];

export const toolkitLinks = [
  { to: "/escape-plans", icon: DoorOpen, label: "Escape Plans", desc: "Exit strategies" },
  { to: "/jargon", icon: Briefcase, label: "Jargon Generator", desc: "Sound smart" },
  { to: "/blame", icon: Shield, label: "Blame Deflector", desc: "Stay innocent" },
  { to: "/backgrounds", icon: Image, label: "Fake Backgrounds", desc: "Look professional" },
];
