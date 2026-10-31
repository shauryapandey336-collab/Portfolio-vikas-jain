# Vikas Jain — Professional Portfolio

Premium Next.js portfolio for Vikas Jain, Director of PNINFOSYS. Public content is stored in browser `localStorage`; uploaded images are stored in IndexedDB.

## Run locally

```bash
npm install
copy .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set the username and password in `.env.local` before signing in at `/admin/login`.

## Content management

The dashboard at `/admin/dashboard` manages profile, biography, skills, workshops, programmes, projects, achievements, gallery content, education, experience, testimonials, social links, SEO and settings. Changes are immediately visible to public routes in the same browser.

- Use **Attach image** after selecting a Profile, Gallery, Workshop or Project record.
- **Export JSON** backs up structured content. **Import JSON** restores it; images stay browser-local and must be uploaded again.
- **Reset defaults** restores the résumé-supported starter content after confirmation.

## Important notes

`NEXT_PUBLIC_*` values are visible in browser code. The admin gate is a local/demo editing control, not production authentication. Use server-side authentication and persistent storage for production.

The contact form validates entries but intentionally does not claim to deliver email. Connect an email, form, or CRM service to enable delivery.
