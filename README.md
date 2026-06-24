# TrackPoint Global — Courier Tracking Platform

> **Fast. Secure. Worldwide Delivery.**

A production-quality MVP courier tracking web app built with Next.js 15, React, TypeScript, Tailwind CSS, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database+Auth-3ecf8e?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)

---

## Features

### Public (Customer-facing)
- **Homepage** with hero, services, how-it-works, coverage, testimonials, and CTA
- **Shipment tracking** by tracking number with detailed timeline view
- **About, Services, Contact, FAQ** pages with real copy
- Fully responsive on mobile, tablet, and desktop

### Admin Dashboard
- **Secure authentication** via Supabase Auth
- **Dashboard** with shipment stats (total, in transit, delivered, pending, delayed)
- **Shipment CRUD** — create, view, edit, delete shipments
- **Auto-generated tracking numbers** (format: `TPG-XXXXXXXX`)
- **Tracking timeline management** — add events that auto-update shipment status & location
- **Search & filter** shipments by tracking number, sender, receiver, or status
- **Settings** page for account info

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Lucide React icons |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Validation | Zod |
| Forms | React Hook Form |
| Date formatting | date-fns |
| Notifications | Sonner (toast) |

---

## Project Structure

```
├── app/
│   ├── (public)/           # Public-facing pages
│   │   ├── layout.tsx      # Public layout with Navbar + Footer
│   │   ├── page.tsx        # Homepage
│   │   ├── track/
│   │   │   ├── page.tsx              # Tracking form page
│   │   │   └── [trackingNumber]/
│   │   │       └── page.tsx          # Tracking result page
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   └── faq/page.tsx
│   ├── admin/
│   │   ├── layout.tsx      # Admin layout with sidebar
│   │   ├── login/page.tsx
│   │   ├── page.tsx        # Dashboard
│   │   ├── shipments/
│   │   │   ├── page.tsx    # Shipments list
│   │   │   ├── new/page.tsx          # Create shipment
│   │   │   └── [id]/page.tsx         # Shipment detail/edit
│   │   └── settings/page.tsx
│   ├── layout.tsx          # Root layout
│   └── globals.css
├── components/
│   ├── public/             # Navbar, Footer, TrackingHeroForm, etc.
│   └── shared/             # StatusBadge, TrackingTimeline, EmptyState
├── lib/
│   ├── supabase/           # Supabase client helpers
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── utils.ts            # Utility functions
│   ├── validators/         # Zod schemas
│   └── actions/            # Server actions
├── types/                  # TypeScript types and constants
├── supabase/
│   ├── schema.sql          # Database schema
│   └── seed.sql            # Demo/seed data
├── middleware.ts            # Auth middleware
└── .env.example            # Environment variables template
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
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
   - **Service role key** (optional, for admin operations)

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

### 4. Set Up Database

1. Go to your Supabase dashboard → **SQL Editor**
2. Open `supabase/schema.sql` and run the entire script
3. Open `supabase/seed.sql` and run it to insert demo data

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
| shipment_type | TEXT | Express, Standard, Cargo, Document |
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

---

## Shipment Statuses

- Pending
- Shipment Created
- Received
- Processing
- In Transit
- At Sorting Facility
- At Customs
- Cleared
- Out for Delivery
- Delivered
- Delayed
- On Hold
- Returned

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the environment variables in Vercel's project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (if used)
4. Deploy!

### Important Notes for Production

1. **Row Level Security (RLS):** The schema enables RLS. For production, configure proper policies in Supabase to restrict data access.
2. **Tracking number uniqueness:** The `tracking_number` column has a unique constraint. The app generates random 8-character codes that are checked for uniqueness.
3. **Public access:** The public tracking page uses a server-side route handler that only returns data for valid tracking numbers, preventing enumeration of all shipments.

---

## Demo Data

The seed file (`supabase/seed.sql`) includes 5 realistic shipments with multiple tracking events:

1. **TPG-20240626-1024** — Lagos → London (In Transit)
2. **TPG-20240625-2048** — Abuja → New York (At Customs)
3. **TPG-20240620-3072** — Kano → Toronto (Out for Delivery)
4. **TPG-20240618-4096** — Port Harcourt → Dubai (Delivered)
5. **TPG-20240622-5120** — Lagos → Manchester (Delayed)

Each shipment has 3–5 tracking events showing realistic shipping progress.

---

## License

MIT © TrackPoint Global