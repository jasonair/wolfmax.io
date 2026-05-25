This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Database (Neon Postgres)

Waitlist signups are stored in Neon Postgres and written **server-side** via the
`/api/waitlist` route handler — the browser never touches the database directly, so
there are no client credentials or access rules to maintain.

1. **Provision Neon** through the [Vercel Marketplace](https://vercel.com/marketplace/neon)
   and connect it to this project. It auto-injects `DATABASE_URL` into the project's
   environment variables.

2. **Local development:** run `vercel env pull .env.local`, or copy the pooled
   connection string from the Neon console into `.env.local`:

   ```env
   DATABASE_URL=postgresql://user:password@host/db?sslmode=require
   ```

3. **Create the table** (idempotent):

   ```bash
   node scripts/migrate.mjs
   ```

   This creates the `signups` table, with a `UNIQUE` constraint on `email` so repeat
   signups are deduped via `INSERT ... ON CONFLICT DO NOTHING`.

**Note:** `.env.local` is gitignored and won't be committed.

### Resend Email Setup (For Contact Form)

This project uses [Resend](https://resend.com) to send emails from the contact form. To set up Resend:

1. **Create a Resend Account:**
   - Go to [Resend](https://resend.com) and sign up for a free account
   - The free tier includes 100 emails per day, which is perfect for getting started

2. **Get Your API Key:**
   - Once logged in, go to the [API Keys](https://resend.com/api-keys) page
   - Click "Create API Key"
   - Give it a name (e.g., "Wolfmax Contact Form")
   - Copy the API key (you'll only see it once!)

3. **Add Environment Variables:**
   - Copy `.env.example` to `.env.local` (or create `.env.local` if it doesn't exist)
   - Add your Resend API key and contact email:

```env
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
```

   - `RESEND_API_KEY`: Your Resend API key (starts with `re_`)
   - `CONTACT_EMAIL`: The email address where you want to receive contact form submissions

4. **Development/Test Mode (No DNS Required!):**
   - ✅ **Good news:** The contact form works immediately in dev/test mode!
   - The API route is already configured to use `onboarding@resend.dev`
   - This works right away without any DNS verification
   - Just add your `RESEND_API_KEY` and `CONTACT_EMAIL` to `.env.local` and you're ready to test
   - Emails will be sent from `onboarding@resend.dev` (this is fine for development)

5. **Production Setup (Optional, for later):**
   - When you're ready for production, you can verify your own domain
   - Go to [Domains](https://resend.com/domains) in Resend dashboard
   - Add your domain and follow the DNS verification steps
   - Once verified, update the `from` field in `src/app/api/contact/route.ts` to use your domain (e.g., `contact@yourdomain.com`)

5. **Update Firestore Security Rules (for Contact Submissions):**
   - Update your Firestore rules to include the contact-submissions collection:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /waitlist/{document=**} {
         allow read: if true;
         allow create: if request.resource.data.email is string && 
                          request.resource.data.email.matches('.*@.*\\..*');
       }
       match /contact-submissions/{document=**} {
         allow create: if request.resource.data.email is string && 
                          request.resource.data.email.matches('.*@.*\\..*') &&
                          request.resource.data.name is string &&
                          request.resource.data.message is string;
       }
     }
   }
   ```

**Note:** Contact form submissions are stored in Firebase (for your records) and also sent via email to the address specified in `CONTACT_EMAIL`.

### Running the Development Server

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
