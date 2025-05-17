export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Canvas {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  collaborators: string[];
  thumbnail: string;
}

export interface DrawingPoint {
  x: number;
  y: number;
  pressure?: number;
}

export interface DrawingStroke {
  id: string;
  points: DrawingPoint[];
  color: string;
  width: number;
  userId: string;
  timestamp: number;
}

export interface ArtSuggestion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}