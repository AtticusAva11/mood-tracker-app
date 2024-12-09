export interface MoodEntry {
  id: string;
  mood: number;
  note: string;
  timestamp: Date;
  userId: string;
}

export interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
}
