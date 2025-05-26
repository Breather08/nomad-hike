export interface Guide {
  id: string;
  name: string;
  photo: string;
  location: string;
  rating: number;
  reviews: number;
  bio: string;
  languages: string[];
  specializations: string[];
  experience: string;
  price?: string;
  availability?: string;
}