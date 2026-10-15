export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface AeoQuestion {
  question: string;
  directAnswer: string;
  details: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BrewSpecs {
  ratio: string;
  grind: string;
  waterTemp: string;
  brewTime: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  servings?: number;
}

export interface ArticleSection {
  heading: string;
  level?: 2 | 3;
  paragraphs: string[];
  tips?: string[];
  callout?: {
    title: string;
    text: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  category: 'Cold Coffee' | 'Brewing Guides' | 'Coffee Beans' | 'Recipes & Drinks' | 'Summer Drinks';
  publishedDate: string; // ISO format: YYYY-MM-DD
  modifiedDate: string;
  author: Author;
  readTime: string;
  wordCount: number;
  featuredImage: string;
  localImageFilename: string;
  imageAlt: string;
  excerpt: string;
  keyTakeaways: string[];
  aeoQuestions: AeoQuestion[];
  sections: ArticleSection[];
  brewSpecs?: BrewSpecs;
  faqs: FAQItem[];
  relatedArticleSlugs: string[];
}
