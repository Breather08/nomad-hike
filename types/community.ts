export interface HikingPartner {
  id: string;
  userName: string;
  userPhoto: string;
  experience: string;
  description: string;
  location: string;
  date: string;
  groupSize: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  participants: number;
  organizer: {
    name: string;
    photo: string;
  };
}