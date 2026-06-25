# TrackPoint Global — Courier Tracking Platform

> **Fast. Secure. Worldwide Delivery.**

A production-quality MVP courier tracking web app built with Next.js 16, React, TypeScript, Tailwind CSS, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database+Auth-3ecf8e?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)

---

## Features

### Public (Customer-facing)
- **Homepage** with hero, services, how-it-works, coverage, testimonials, and CTA
- **Shipment tracking** by tracking number with detailed timeline view, status badges, and shipment summary
- **About, Services, Contact, FAQ** pages with realistic logistics company copy
- **Polished tracking result page** with shipment details grid, status badge, timeline, and not-found state
- Fully responsive on mobile, tablet, and desktop
- Loading states and empty states across all public flows

### Admin Dashboard
- **Secure authentication** via Supabase Auth
- **Dashboard** with shipment stats (total, in transit, delivered, pending, delayed) and quick actions
- **Shipment CRUD** — create, view, edit, delete shipments (all via server actions)
- **Auto-generated tracking numbers** (format: `TPG-XXXXXXXX`)
- **Tracking timeline management** — add events that auto-update shipment status & location
- **Search & filter** shipments by tracking number, sender, receiver, or status
- **Company Settings** page — editable company profile, branding, and operations defaults
- Loading states, empty states, and error toasts throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Lucide React icons |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Validation | Zod |
| Notifications | Sonner (toast) |

---

## Security Architecture

### Public Tracking (Secure by Default)
- The `shipments` and `tracking_events` tables have RLS enabled with **no public SELECT policies**
- Public tracking lookups use a **server-only admin client** (`lib/supabase/admin.ts`) that bypasses RLS
- The `getPublicShipmentByTrackingNumber()` server action accepts only a tracking number and returns **safe public fields** (no phone numbers, emails, or admin notes)
- The anon key **cannot** read shipment or tracking event data directly

### Admin Operations
- All admin CRUD operations use **server actions** (no direct browser-to-Supabase writes)
- Admin routes are protected by **middleware** that checks Supabase Auth session
- Admin reads use the **authenticated server client** with the user's session
- The `SUPABASE_SERVICE_ROLE_KEY` is **never** exposed to the browser

---

## Project Structure

```
├── app/
│   ├── (public)/           # Public-facing pages
│   │   ├── layout.tsx      # Public layout with Navbar + Footer
│   │   ├── page.tsx        # Homepage
│   │   ├── track/
│   │   │   ├── page.tsx              # Tracking form page
│   │   │   ├── loading.tsx           # Loading state
│   │   │   └── [trackingNumber]/
│   │   │       ├── page.tsx          # Tracking result server page
│   │   │       └── PublicTrackingClient.tsx  # Client component for tracking display
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   └── faq/page.tsx
│   ├── admin/
│   │   ├── layout.tsx      # Admin layout with sidebar
│   │   ├── login/page.tsx
│   │   ├── loading.tsx     # Admin loading skeleton
│   │   ├── page.tsx        # Dashboard
│   │   ├── shipments/
│   │   │   ├── page.tsx              # Shipments list (server page)
│   │   │   ├── loading.tsx           # Loading skeleton
│   │   │   ├── ShipmentsListClient.tsx       # Client-side list with search/filter/delete
│   │   │   ├── new/page.tsx          # Create shipment (server actions)
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # Shipment detail (server page)
│   │   │       ├── loading.tsx       # Loading skeleton
│   │   │       └── ShipmentDetailClient.tsx  # Client detail/edit component
│   │   └── settings/
│   │       ├── page.tsx              # Settings server page
│   │       └── SettingsForm.tsx      # Client settings form
│   ├── api/
│   │   └── track/[trackingNumber]/route.ts  # Tracking API endpoint
│   ├── layout.tsx          # Root layout
│   ├── globals.css
│   ├── not-found.tsx       # Custom 404 page
│   └── error.tsx           # Custom error page
├── components/
│   ├── public/             # Navbar, Footer, TrackingHeroForm
│   └── shared/             # StatusBadge, TrackingTimeline, EmptyState
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser Supabase client (for auth UI)
│   │   ├── server.ts       # Server Supabase client (session-aware)
│   │   ├── admin.ts        # Server-only admin client (service role, bypasses RLS)
│   │   └── middleware.ts   # Supabase session refresh helper
│   ├── utils.ts            # Utility functions (cn, formatDate, generateTrackingNumber, normalizeTrackingNumber)
│   ├── validators/
│   │   └── shipment.ts     # Zod schemas for shipment/tracking event validation
│   └── actions/
│       ├── shipments.ts    # Shipment CRUD server actions + public tracking lookup
│       └── settings.ts     # Settings load/update server actions
├── types/
│   └── index.ts            # TypeScript types and constants
├── supabase/
│   ├── schema.sql          # Database schema with locked-down RLS policies
│   └── seed.sql            # Demo/seed data (7 realistic shipments)
├── middleware.ts            # Auth middleware (protects admin routes)
├── .env.example             # Environment variables template
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- A [Supabase](https://supabase.com) account (free tier works)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd trackpoint-global
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned
3. Go to **Settings → API** and copy your:
   - **Project URL**
   - **Anon public key**
   - **Service role key** (required for public tracking and admin operations)

### 3. Configure Environment Variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

> ⚠️ **Important:** The `SUPABASE_SERVICE_ROLE_KEY` must **only** be used server-side. It is used by `lib/supabase/admin.ts` to securely look up shipments for public tracking. **Never** expose it to the browser or commit it to version control.

### 4. Set Up Database

1. Go to your Supabase dashboard → **SQL Editor**
2. Open `supabase/schema.sql` and run the entire script
3. Open `supabase/seed.sql` and run it to insert demo data

The schema creates:
- `shipments` table with proper columns and constraints
- `tracking_events` table linked to shipments
- `company_settings` table for admin-configurable company info
- RLS policies that **restrict public access** — only authenticated users can read/write
- Proper indexes for performance

### 5. Create Admin User

1. Go to Supabase dashboard → **Authentication → Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter an email and password (e.g., `admin@trackpointglobal.com` / `password123`)
4. This user can now log in at `/admin/login`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the public website.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to access the admin dashboard.

---

## How Public Tracking Works Securely

1. A visitor enters a tracking number on `/track`
2. They are redirected to `/track/[trackingNumber]`
3. The page calls `getPublicShipmentByTrackingNumber(trackingNumber)` server action
4. This action uses the **server-only admin client** (service role key) to look up the shipment
5. Only **safe public fields** are returned (no phone, email, or admin notes)
6. The result is rendered server-side with tracking events sorted by time

The anon key **cannot** query shipments or tracking events directly — RLS blocks all unauthenticated access.

---

## Database Schema

### `shipments` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| tracking_number | TEXT | Unique tracking code (e.g., `TPG-XXXXXXXX`) |
| sender_name | TEXT | Sender's full name |
| sender_phone | TEXT | Sender's phone |
| sender_email | TEXT | Sender's email |
| receiver_name | TEXT | Receiver's full name |
| receiver_phone | TEXT | Receiver's phone |
| receiver_email | TEXT | Receiver's email |
| origin_country | TEXT | Origin country |
| origin_city | TEXT | Origin city |
| destination_country | TEXT | Destination country |
| destination_city | TEXT | Destination city |
| shipment_type | TEXT | Standard, Express, International, Same Day, Economy |
| package_description | TEXT | Package contents description |
| package_weight | TEXT | Package weight |
| status | TEXT | Current shipment status |
| current_location | TEXT | Current shipment location |
| shipped_at | TIMESTAMPTZ | Shipment date |
| estimated_delivery | TIMESTAMPTZ | Estimated delivery date |
| delivered_at | TIMESTAMPTZ | Actual delivery date |
| admin_note | TEXT | Internal admin notes |
| created_at | TIMESTAMPTZ | Record creation time |
| updated_at | TIMESTAMPTZ | Last update time |

### `tracking_events` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| shipment_id | UUID | References shipments(id) |
| status | TEXT | Event status |
| location | TEXT | Event location |
| note | TEXT | Event description/note |
| event_time | TIMESTAMPTZ | When the event occurred |
| created_at | TIMESTAMPTZ | Record creation time |

### `company_settings` table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-created, single row) |
| company_name | TEXT | Company display name |
| tagline | TEXT | Company tagline |
| support_email | TEXT | Support contact email |
| support_phone | TEXT | Support contact phone |
| office_address | TEXT | Office address |
| business_hours | TEXT | Business hours |
| logo_url | TEXT | Logo image URL |
| brand_color | TEXT | Primary brand color hex |
| company_description | TEXT | Short company description |
| default_origin_country | TEXT | Default origin country for new shipments |
| default_origin_city | TEXT | Default origin city for new shipments |
| default_support_response | TEXT | Default support auto-response text |
| default_tracking_help | TEXT | Help text shown on tracking pages |
| created_at | TIMESTAMPTZ | Record creation time |
| updated_at | TIMESTAMPTZ | Last update time |

---

## Shipment Statuses

- Shipment Created
- Picked Up
- In Transit
- At Customs
- Cleared Customs
- Out for Delivery
- Delivered
- Delayed
- On Hold
- Returned

## Shipment Types

- Standard
- Express
- International
- Same Day
- Economy

---

## Demo Data

The seed file (`supabase/seed.sql`) includes 7 realistic shipments with multiple tracking events covering all major statuses:

| # | Tracking Number | Route | Type | Status |
|---|----------------|-------|------|--------|
| 1 | TPG-2026-00147 | Sheridan, US → London, UK | Express | In Transit |
| 2 | TPG-2026-00152 | New York, US → Dubai, UAE | International | At Customs |
| 3 | TPG-2026-00098 | Chicago, US → Toronto, CA | Standard | Delivered |
| 4 | TPG-2026-00163 | Los Angeles, US → Sydney, AU | Express | Out for Delivery |
| 5 | TPG-2026-00139 | Miami, US → Accra, GH | Standard | Delayed |
| 6 | TPG-2026-00171 | Dallas, US → Singapore, SG | International | Shipment Created |
| 7 | TPG-2026-00158 | Seattle, US → Tokyo, JP | Standard | In Transit |

Each shipment has 2–6 tracking events with realistic location progression and timestamps.

The seed also creates a default **company_settings** row for the admin settings page.

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the environment variables in Vercel's project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (required for public tracking)
4. Deploy!

### Important Notes for Production

1. **Row Level Security (RLS):** The schema locks down public access. All shipment data access goes through server actions with either the authenticated user's session or the server-only admin client.
2. **Service Role Key:** Must **only** be set as a server-side environment variable. Vercel automatically strips `NEXT_PUBLIC_*` vars from client bundles but **not** non-prefixed vars — however, never import `lib/supabase/admin.ts` in client components.
3. **Tracking number uniqueness:** The `tracking_number` column has a unique constraint. The app generates random 8-character codes that are checked for uniqueness.
4. **Public access:** The public tracking page uses a server-only admin client to look up shipments by tracking number, returning only safe fields. No internal data (emails, phone numbers, admin notes) is ever exposed.
5. **Company Settings:** Run the `company_settings` table creation from `schema.sql` before deploying. The seed file creates a default row. Admin users can update settings from `/admin/settings`.

---

## License

MIT © TrackPoint Global