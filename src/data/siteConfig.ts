export const SITE_CONFIG = {
  name: 'The Coffee Journal',
  tagline: 'Artisanal Coffee Culture, Home Brewing Guides & Bean Science',
  description: 'Your definitive coffee education resource for college students, home baristas, and coffee enthusiasts. Master cold coffee, espresso, bean selection, and manual brewing.',
  // Production canonical domain
  siteUrl: 'https://coffee-blog-gamma.vercel.app',
  defaultAuthor: {
    name: 'Julian Vance',
    role: 'Head Coffee Educator & Q-Grader Apprentice',
    bio: 'Julian has spent over eight years tasting origin coffees, testing manual brewing ratios, and teaching college students how to brew specialty coffee on a student budget.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  },
  social: {
    twitter: '@coffeejournal',
    instagram: '@thecoffeejournal',
    github: 'https://github.com',
  },
  categories: [
    'Cold Coffee',
    'Brewing Guides',
    'Coffee Beans',
    'Recipes & Drinks',
  ] as const,
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'All Articles', path: '/blog' },
    { label: 'Cold Coffee', path: '/blog?category=Cold+Coffee' },
    { label: 'Brewing Guides', path: '/blog?category=Brewing+Guides' },
    { label: 'Coffee Beans', path: '/blog?category=Coffee+Beans' },
    { label: 'About', path: '/about' },
  ],
};
