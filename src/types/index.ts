export interface MoodEntry {
  id: string;
  mood: number;
  note: string;
  timestamp: Date;
  userId: string;
}

export interface User {
  id: string;
  email: string;
}
