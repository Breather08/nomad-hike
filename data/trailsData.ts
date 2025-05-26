import { Trail } from '@/types/trail';

export const Trails: Trail[] = [
  {
    id: '1',
    name: 'Butakovka Waterfall',
    location: 'Almaty',
    difficulty: 'easy',
    distance: '5.2 km',
    elevation: '350 m',
    duration: '2-3 hours',
    description:
      'A popular trail near Almaty that leads to a beautiful waterfall. Perfect for beginners and families.',
    image:
      'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=800',
    verified: true,
    coordinates: {
      latitude: 43.1759,
      longitude: 77.0047,
    },
    conditions: {
      status: 'good',
      updatedAt: '2025-03-10',
      notes: 'Trail is clear, some muddy sections after recent rain.',
    },
  },
  {
    id: '2',
    name: 'Kok-Zhailau Plateau',
    location: 'Almaty',
    difficulty: 'moderate',
    distance: '14 km',
    elevation: '900 m',
    duration: '5-6 hours',
    description:
      'A challenging but rewarding hike to one of the most scenic plateaus near Almaty. Panoramic views of the city and mountains.',
    image:
      'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    verified: true,
    coordinates: {
      latitude: 43.1594,
      longitude: 77.0676,
    },
    conditions: {
      status: 'excellent',
      updatedAt: '2025-03-12',
    },
  },
  {
    id: '3',
    name: 'Big Almaty Lake Trail',
    location: 'Almaty',
    difficulty: 'moderate',
    distance: '8 km',
    elevation: '600 m',
    duration: '4 hours',
    description:
      'Hike to the stunning Big Almaty Lake, known for its turquoise waters surrounded by snow-capped mountains.',
    image:
      'https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=800',
    verified: true,
    coordinates: {
      latitude: 43.0538,
      longitude: 76.9838,
    },
    conditions: {
      status: 'good',
      updatedAt: '2025-03-09',
    },
  },
  {
    id: '4',
    name: 'Charyn Canyon Rim',
    location: 'Almaty Region',
    difficulty: 'easy',
    distance: '4 km',
    elevation: '200 m',
    duration: '2 hours',
    description:
      "A scenic walk along the rim of Kazakhstan's famous Charyn Canyon, often called the Grand Canyon's little brother.",
    image:
      'https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=800',
    verified: false,
    coordinates: {
      latitude: 43.3508,
      longitude: 79.0819,
    },
    conditions: {
      status: 'fair',
      updatedAt: '2025-03-01',
      notes: 'Some parts of the trail are eroded. Caution advised.',
    },
  },
  {
    id: '5',
    name: 'Furmanov Peak',
    location: 'Almaty',
    difficulty: 'hard',
    distance: '18 km',
    elevation: '1200 m',
    duration: '8-10 hours',
    description:
      'A challenging full-day hike to Furmanov Peak with stunning views of the Tien Shan mountain range.',
    image:
      'https://images.pexels.com/photos/7925859/pexels-photo-7925859.jpeg?auto=compress&cs=tinysrgb&w=800',
    verified: true,
    coordinates: {
      latitude: 43.1085,
      longitude: 77.0923,
    },
    conditions: {
      status: 'good',
      updatedAt: '2025-03-08',
    },
  },
  {
    id: '6',
    name: 'Kolsai Lakes Trail',
    location: 'Almaty Region',
    difficulty: 'moderate',
    distance: '9 km',
    elevation: '700 m',
    duration: '5 hours',
    description:
      'Hike between the stunning Kolsai Lakes, often called the "Pearls of the Tien Shan." Beautiful alpine scenery.',
    image:
      'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800',
    verified: true,
    coordinates: {
      latitude: 42.9394,
      longitude: 78.322,
    },
    conditions: {
      status: 'excellent',
      updatedAt: '2025-03-05',
    },
  },
];
