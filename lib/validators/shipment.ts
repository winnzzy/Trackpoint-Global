import { z } from "zod";

export const shipmentFormSchema = z.object({
  tracking_number: z.string().optional(),
  sender_name: z.string().min(1, "Sender name is required"),
  sender_phone: z.string().optional().nullable(),
  sender_email: z.string().email("Invalid email").optional().nullable().or(z.literal("")),
  receiver_name: z.string().min(1, "Receiver name is required"),
  receiver_phone: z.string().optional().nullable(),
  receiver_email: z.string().email("Invalid email").optional().nullable().or(z.literal("")),
  origin_country: z.string().min(1, "Origin country is required"),
  origin_city: z.string().min(1, "Origin city is required"),
  destination_country: z.string().min(1, "Destination country is required"),
  destination_city: z.string().min(1, "Destination city is required"),
  shipment_type: z.enum(["Standard", "Express", "International", "Same Day", "Economy"]),
  package_description: z.string().optional().nullable(),
  package_weight: z.string().optional().nullable(),
  status: z.string().min(1, "Status is required"),
  current_location: z.string().optional().nullable(),
  shipped_at: z.string().optional().nullable(),
  estimated_delivery: z.string().optional().nullable(),
  admin_note: z.string().optional().nullable(),
});

export const trackingEventSchema = z.object({
  status: z.string().min(1, "Status is required"),
  location: z.string().min(1, "Location is required"),
  note: z.string().optional().nullable(),
  event_time: z.string().min(1, "Event time is required"),
});

export const exceptionFormSchema = z.object({
  type: z.enum([
    'delay',
    'customs_hold',
    'address_issue',
    'failed_delivery_attempt',
    'weather_disruption',
    'security_review',
    'documentation_review',
    'other',
  ]),
  severity: z.enum(['info', 'warning', 'critical']),
  title: z.string().min(1, 'Title is required'),
  customer_message: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  action_required: z.boolean().default(false),
  action_label: z.string().optional().nullable(),
  updated_eta: z.string().optional().nullable(),
  internal_note: z.string().optional().nullable(),
});

export const resolveExceptionSchema = z.object({
  resolved_at: z.string().optional(),
});

export type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;
export type TrackingEventFormValues = z.infer<typeof trackingEventSchema>;
export type ExceptionFormValues = z.infer<typeof exceptionFormSchema>;
