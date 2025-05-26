export interface Trail {
  id: string;
  name: string;
  location: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  distance: string;
  elevation: string;
  duration: string;
  description: string;
  image: string;
  verified: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  conditions?: {
    status: 'excellent' | 'good' | 'fair' | 'poor' | 'closed';
    updatedAt: string;
    notes?: string;
  };
}