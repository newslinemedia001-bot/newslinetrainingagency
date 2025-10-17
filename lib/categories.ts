export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export const categories: Category[] = [
  {
    id: 'media',
    name: 'Media',
  },
  {
    id: 'public-relations',
    name: 'Public Relations',
  },
  {
    id: 'film-production',
    name: 'Film Production',
  },
  {
    id: 'graphic-design',
    name: 'Graphic and Design',
  },
  {
    id: 'animation-video-editing',
    name: 'Animation and Video Editing',
  },
  {
    id: 'scripting',
    name: 'Scripting',
  },
  {
    id: 'photography',
    name: 'Photography',
  },
  {
    id: 'computer-science',
    name: 'Computer Science / Information Technology',
    subcategories: [
      'General',
      'Cybersecurity',
      'Mobile Development (Android)',
      'Mobile Development (iOS)',
      'Web Development',
      'Web Design',
      'Networking',
      'Graphic Design',
    ],
  },
];
