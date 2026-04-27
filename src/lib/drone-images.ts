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
    alt: 'Aerial hero shot over a residential property at golden hour',
    title: 'Residential Listing Coverage',
  },
  {
    id: '2',
    src: '/drone/DJI_0587.JPG',
    alt: 'High-angle drone still focused on building footprint and surrounding lot lines',
    title: 'Building Footprint Detail',
  },
  {
    id: '3',
    src: '/drone/DJI_0710.JPG',
    alt: 'Wide commercial aerial showing surrounding access roads and site context',
    title: 'Commercial Site Context',
  },
  {
    id: '4',
    src: '/drone/DJI_0718.JPG',
    alt: 'Landscape-focused drone composition showing terrain and neighboring property lines',
    title: 'Terrain And Boundary View',
  },
  {
    id: '5',
    src: '/drone/DJI_0868.JPG',
    alt: 'Development progress image captured from an elevated oblique angle',
    title: 'Development Progress Tracking',
  },
  {
    id: '6',
    src: '/drone/DJI_20251221151114_0520_D.JPG',
    alt: 'Cardinal-direction imaging frame used for inspection and documentation work',
    title: 'Inspection Imaging',
  },
  {
    id: '7',
    src: '/drone/DJI_20251222221530_0060_D.JPG',
    alt: 'Twilight drone image used for premium marketing and listing presentations',
    title: 'Twilight Marketing Capture',
  },
  {
    id: '8',
    src: '/drone/DJI_20260125123121_0016_D.JPG',
    alt: 'Recent aerial documentation project with clear view of structures and lot orientation',
    title: 'Latest Coverage Sample',
  },
];
