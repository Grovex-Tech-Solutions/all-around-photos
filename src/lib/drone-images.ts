export interface DroneImage {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export const droneImages: DroneImage[] = [
  {
    id: '1',
    src: '/drone/DJI_0462.JPG',
    alt: 'Aerial property survey',
    title: 'Property Aerial View',
  },
  {
    id: '2',
    src: '/drone/DJI_0587.JPG',
    alt: 'Building detail aerial shot',
    title: 'Construction Site Overview',
  },
  {
    id: '3',
    src: '/drone/DJI_0718.JPG',
    alt: 'Landscape aerial photography',
    title: 'Landscape Photography',
  },
  {
    id: '4',
    src: '/drone/DJI_0868.JPG',
    alt: 'Development project aerial view',
    title: 'Development Project',
  },
  {
    id: '5',
    src: '/drone/DJI_20251221151114_0520_D.JPG',
    alt: 'Professional aerial work',
    title: 'Professional Aerial Work',
  },
  {
    id: '6',
    src: '/drone/DJI_20260125123121_0016_D.JPG',
    alt: 'Latest drone photography project',
    title: 'Recent Project',
  },
];
