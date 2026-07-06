# NovaLabs — Frontend

This is the frontend for [NovaLabs](https://github.com/NovaCoreLabs1/NovaLabs), a comprehensive coworking and workspace management system. Built with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI primitives + custom components
- **Theme**: next-themes (light/dark/system)
- **Notifications**: Sonner toast

---

## Project Structure

```plaintext
frontend/
├── app/                # Next.js App Router pages
│   ├── (auth)/         # Authentication routes (login, register, etc.)
│   ├── admin/          # Admin dashboard pages
│   ├── dashboard/      # Member dashboard
│   ├── bookings/       # Booking management
│   ├── workspaces/     # Workspace browsing
│   ├── invoices/       # Invoice management
│   ├── settings/       # User settings
│   ├── profile/        # User profile
│   └── ...
├── components/         # Reusable UI components
│   ├── auth/           # Authentication forms and flows
│   ├── dashboard/      # Dashboard-specific components
│   ├── ui/             # Base UI components
│   └── ...
├── lib/                # Utilities, hooks, store, types
│   ├── react-query/    # TanStack Query hooks
│   ├── store/          # Zustand store
│   ├── types/          # TypeScript type definitions
│   └── ...
├── providers/          # React context providers
├── public/             # Static assets
└── utils/              # Utility functions
```

---

## Environment Variables

Create a `.env.local` file in the `frontend/` directory and configure:

```bash
NEXT_PUBLIC_API_URL=http://localhost:6000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_token
```

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
