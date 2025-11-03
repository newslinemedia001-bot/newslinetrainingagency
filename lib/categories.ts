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
    id: 'computer-science-general',
    name: 'Computer Science (General)',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
  },
  {
    id: 'mobile-development-android',
    name: 'Mobile Development (Android)',
  },
  {
    id: 'mobile-development-ios',
    name: 'Mobile Development (iOS)',
  },
  {
    id: 'web-development',
    name: 'Web Development',
  },
  {
    id: 'web-design',
    name: 'Web Design',
  },
  {
    id: 'networking',
    name: 'Networking',
  },
  {
    id: 'it-graphic-design',
    name: 'IT Graphic Design',
  },
];
