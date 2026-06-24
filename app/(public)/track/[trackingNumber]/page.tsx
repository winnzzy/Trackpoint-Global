import PublicTrackingClient from './PublicTrackingClient';

export async function generateMetadata({ params }: { params: Promise<{ trackingNumber: string }> }) {
  const { trackingNumber } = await params;
  const decoded = decodeURIComponent(trackingNumber);
  return {
    title: `Tracking ${decoded} | TrackPoint Global`,
    description: `Track the status and location of shipment ${decoded} with TrackPoint Global.`,
  };
}

export default async function TrackingResultPage({ params }: { params: Promise<{ trackingNumber: string }> }) {
  const { trackingNumber } = await params;
  const decoded = decodeURIComponent(trackingNumber);
  return <PublicTrackingClient trackingNumber={decoded} />;
}