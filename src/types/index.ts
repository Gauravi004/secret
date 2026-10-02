export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  tag?: string;
  highlight?: boolean;
}

export interface MemoryMedia {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  caption: string;
  date?: string;
  category: 'together' | 'rishi' | 'funny' | 'rides';
}

export interface LoveReason {
  id: number;
  title: string;
  description: string;
  image?: string;
  quote?: string;
}

export interface InsideJoke {
  id: string;
  frontTitle: string;
  frontSubtitle: string;
  punchline: string;
  theRealStory: string;
  tag: string;
  image?: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  whyItMatters: string;
  associatedMemory: string;
  audioSrc?: string;
  duration?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  correctMessage: string;
  incorrectMessage: string;
  funFact: string;
}

export interface BucketListItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  memoryNote?: string;
}
