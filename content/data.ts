export type EventItem = {
  title: string;
  slug: string;
  date: string;
  mode: "Online" | "In-person";
  city?: string;
  description: string;
  tags: string[];
};

export type BlogItem = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
};

/**
 * Webinars are fetched from Supabase.
 * This type matches the webinar data used in the UI.
 */
export type WebinarItem = {
  id: string;
  title: string;
  slug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  tags: string[];
};

export type ResourceItem = {
  title: string;
  type: "Guide" | "Template" | "Article" | "Video";
  desc: string;
  tags: string[];
};

export const stats = [
  { label: "Community members", value: "25,000+" },
  { label: "Countries reached", value: "30+" },
  { label: "Events hosted", value: "400+" },
  { label: "Active chapters", value: "40+" },
];

export const events: EventItem[] = [
  {
    title: "Testing Basics Meetup",
    slug: "testing-basics-meetup",
    date: "Feb 10, 2026",
    mode: "Online",
    description:
      "A simple, friendly session for people starting in testing. We cover basics and answer questions.",
    tags: ["Beginners", "Live Q&A", "Community"],
  },
  {
    title: "Automation Study Jam",
    slug: "automation-study-jam",
    date: "Feb 21, 2026",
    mode: "Online",
    description:
      "A focused learning session. We break problems down and practise together step by step.",
    tags: ["Automation", "Practice", "Study"],
  },
  {
    title: "Lagos Testers Hangout",
    slug: "lagos-testers-hangout",
    date: "Mar 07, 2026",
    mode: "In-person",
    city: "Lagos",
    description:
      "Meet other testers, share experiences, and build real connections in your city.",
    tags: ["Networking", "Lagos", "Meetup"],
  },
];

/**
 * BLOG CONTENT (replaced chapters)
 */
export const blogs: BlogItem[] = [
  {
    title: "How to start a career in software testing",
    slug: "how-to-start-software-testing",
    excerpt:
      "A simple guide for beginners who want to understand testing, learn the basics, and avoid common mistakes.",
    category: "Beginners",
    tags: ["Testing", "Career", "Beginners"],
  },
  {
    title: "Manual testing vs automation: what you should learn first",
    slug: "manual-vs-automation-testing",
    excerpt:
      "We explain the difference between manual and automated testing, and when each one makes sense.",
    category: "Learning",
    tags: ["Manual Testing", "Automation", "QA"],
  },
  {
    title: "Common testing terms explained in simple words",
    slug: "testing-terms-explained",
    excerpt:
      "A beginner-friendly explanation of common testing words you will hear often in QA roles.",
    category: "Education",
    tags: ["Basics", "Learning", "QA"],
  },
  {
    title: "How to prepare for your first QA interview",
    slug: "prepare-for-qa-interview",
    excerpt:
      "Practical tips to help you prepare, answer questions with confidence, and show your skills.",
    category: "Career",
    tags: ["Interview", "Career", "QA"],
  },
];

/**
 * ✅ No hardcoded webinars here.
 * Webinars are fetched from Supabase using getWebinars().
 */

export const resources: ResourceItem[] = [
  {
    title: "Bug report template (simple)",
    type: "Template",
    desc: "A clear template that helps you report bugs without confusion.",
    tags: ["Template", "Beginners"],
  },
  {
    title: "How to prepare for a QA interview",
    type: "Guide",
    desc: "Simple steps to help you get ready, speak well, and show your work.",
    tags: ["Career", "Interview"],
  },
  {
    title: "Testing basics: key words you must know",
    type: "Article",
    desc: "A short list of common testing terms explained with simple words.",
    tags: ["Basics", "Learning"],
  },
];
