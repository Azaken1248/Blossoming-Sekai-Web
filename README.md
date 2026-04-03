# Blossoming Sekai

Welcome to Blossoming Sekai! A fun and vibrant React + TypeScript web application showcasing the amazing Blossoming Sekai community and Miku content. Originally built with vanilla HTML, CSS, and JavaScript, we've given it a fresh React makeover for better vibes and performance!

## About

Blossoming Sekai is all about celebrating the community and sharing the love for Miku! This interactive web application brings together community content, analytics, and member profiles in one beautiful space. Whether you're checking out stats, finding members, or learning about the server - we've got you covered with a sleek, responsive design.

**Fun fact:** This is a shiny new React port of the original HTML/CSS/JavaScript version - we modernized the code while keeping all the charm and functionality intact!

## Credits

**Server Owner & Creator:** Charlie (And a big thanks to the whole Blossoming Sekai community!)

## What's Inside

- **Home Page** - Meet the server with a stunning Hero section, cool features, commands guide, and setup info
- **Analytics Dashboard** - Check out real-time stats, groovy charts, data tables, and badges!
- **Member Profiles** - See who's in the community with cute ID cards and sidebars
- **Mobile Friendly** - Looks amazing on your phone, tablet, or computer
- **Type-Safe** - Built with TypeScript to keep everything running smoothly

## Project Structure

```
BlossomingSekai/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ControlPanel.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── StepCard.tsx
│   ├── pages/               # Page components
│   │   ├── home/
│   │   │   ├── Home.tsx
│   │   │   └── sections/
│   │   │       ├── Commands.tsx
│   │   │       ├── Features.tsx
│   │   │       ├── Hero.tsx
│   │   │       └── Setup.tsx
│   │   ├── analytics/
│   │   │   ├── Dashboard.tsx
│   │   │   └── sections/
│   │   │       ├── Badges.tsx
│   │   │       ├── ChartAnalysis.tsx
│   │   │       ├── DataTable.tsx
│   │   │       └── StatsGrid.tsx
│   │   └── members/
│   │       ├── Profile.tsx
│   │       └── sections/
│   │           ├── IdCard.tsx
│   │           └── ProfileSidebar.tsx
│   ├── assets/              # Images and static assets
│   ├── App.tsx              # Main App component
│   ├── App.css              # Global styles
│   ├── main.tsx             # Entry point
│   └── index.css            # Base styles
├── public/                  # Static public files
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Getting Started

### What You'll Need
- Node.js 16 or newer (seriously, pretty much any modern version works!)
- npm or yarn (your choice!)

### Let's Go!

```bash
# Grab all the dependencies
npm install

# Start the dev server and get jamming
npm run dev
```

Head over to `http://localhost:5173` and start exploring! The dev server will hot-reload your changes, so you can see everything instantly.

### Ready for the Big Stage?

```bash
# Build it for production
npm run build

# Or preview it locally first
npm run preview
```

### Keep It Clean

```bash
# Run the linter and make sure everything looks good
npm run lint
```

## The Tech Stack

- **React 18** - The modern way to build UIs
- **TypeScript** - Catch bugs before they happen with type safety
- **Vite** - Lightning-fast build tool (seriously, it's *fast*)
- **CSS** - Clean, custom styling
- **Vercel** - Deployed and ready to rock

## Going Live

This project is all set up for Vercel deployment with the included `vercel.json` config. Push to GitHub and let Vercel handle the rest!

---

Made with love for the Blossoming Sekai community
