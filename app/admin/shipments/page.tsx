import { getShipments } from "@/lib/actions/shipments";
import ShipmentsListClient from "./ShipmentsListClient";

export const dynamic = "force-dynamic";

export default async function AdminShipmentsPage() {
  const { data: shipments, error } = await getShipments();

  return (
    <ShipmentsListClient
      initialShipments={shipments || []}
      error={error}
    />
  );
}