import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drone Services | All Around Photos',
  description: 'Aerial photography and videography for real estate, events, and commercial use.',
};

export default function DroneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
