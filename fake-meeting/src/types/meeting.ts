export interface Participant {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  videoUrl?: string;
  isMuted: boolean;
  hasVideo: boolean;
  isSpeaking?: boolean;
  isPinned?: boolean;
  isHost?: boolean;
  isYou?: boolean;
}

export interface MeetingConfig {
  meetingName: string;
  meetingId: string;
  yourName: string;
  participants: Participant[];
}

export const defaultParticipants: Participant[] = [
  {
    id: "1",
    name: "John Doe",
    initials: "JD",
    avatar: "image1",
    isMuted: false,
    hasVideo: true,
    isSpeaking: false,
    isPinned: false,
    isHost: false,
    isYou: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    initials: "JS",
    avatar: "image2",
    isMuted: true,
    hasVideo: true,
    isSpeaking: false,
    isPinned: false,
    isHost: false,
    isYou: false,
  },
  {
    id: "3",
    name: "Peter Jones",
    initials: "PJ",
    avatar: "image3",
    isMuted: false,
    hasVideo: false,
    isSpeaking: true,
    isPinned: false,
    isHost: true,
    isYou: false,
  },
  {
    id: "4",
    name: "You",
    initials: "Y",
    avatar: "image4",
    isMuted: false,
    hasVideo: true,
    isSpeaking: false,
    isPinned: false,
    isHost: false,
    isYou: true,
  },
];

export const sampleVideos = [
  "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-43875-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-man-with-headphones-in-a-video-call-45259-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-woman-talking-on-video-call-with-headphones-43879-large.mp4",
];
