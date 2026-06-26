// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for site content.
//
// IMPORTANT: Every claim here is grounded in the original kirpahomehealthcare.org
// site (Home, About, Services, Employment pages). Do NOT add promises the
// business has not made, e.g. specific response times, "free" assessments,
// guarantees, testimonials, pay/benefits, or service areas beyond Ashburn, VA.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Kirpa Home Health Care",
  shortName: "Kirpa",
  // Verbatim from the original homepage.
  tagline:
    "Dedicated to providing exceptional care and support to individuals and families in the comfort of their own homes.",
  // Verbatim mission/goal from the original site.
  mission:
    "Our goal is to enhance the lives of our patients and their families by providing comfort, support, and dignity.",
  phone: "703-939-5287",
  phoneHref: "tel:+17039395287",
  email: "kirpahhc@gmail.com",
  address: {
    line1: "20130 Lakeview Center Plaza",
    line2: "Suite 409",
    city: "Ashburn",
    state: "VA",
    zip: "20147",
    full: "20130 Lakeview Center Plaza, Suite 409, Ashburn, VA 20147",
  },
  mapsQuery:
    "20130 Lakeview Center Plaza Suite 409 Ashburn VA 20147",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kirpahomehealthcare.org",
  // Verified on the About page: team available around the clock.
  availability: "Care professionals available 24/7",
};

// Social profile URLs. Leave a value empty ("") to hide that icon until a real
// profile exists, we never render dead "#" links.
export const SOCIAL = {
  facebook: "",
  instagram: "",
  linkedin: "",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Request Care", href: "/request-service" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Verified on the About page.
export const CARE_TEAM = [
  "Registered nurses",
  "Social workers",
  "Certified nursing assistants",
];

// Verified: works with a variety of insurance providers, including Medicare and Medicaid.
export const INSURANCE_NOTE =
  "We work with a variety of insurance providers, including Medicare and Medicaid, to help make care accessible.";

// ── Services ────────────────────────────────────────────────────────────────
// Grouped for readability, but every item below is named on the original
// Services page. Nothing here is invented.
export const SERVICE_GROUPS = [
  {
    slug: "personal-care",
    title: "Personal Care",
    icon: "user",
    blurb:
      "Compassionate, hands-on help with the everyday activities that keep daily life comfortable and dignified.",
    items: [
      "Bathing",
      "Dressing",
      "Oral hygiene",
      "Eating",
      "Incontinence care",
      "Safety & fall protection",
    ],
  },
  {
    slug: "companionship",
    title: "Companionship",
    icon: "heart",
    blurb:
      "Friendly company and engagement that brighten the day and support emotional well-being.",
    items: [
      "Companionship",
      "Accompany on walks",
      "Hobbies",
      "Recreational activities",
      "Pet care & feeding",
    ],
  },
  {
    slug: "homemaking",
    title: "Homemaking",
    icon: "home",
    blurb:
      "Light household help that keeps the home tidy, organized, and running smoothly.",
    items: [
      "Meal preparation",
      "Laundry",
      "Bed making",
      "Dusting",
      "Mopping",
      "Organizing incoming mail",
      "Household activities",
    ],
  },
  {
    slug: "errands-transportation",
    title: "Errands & Transportation",
    icon: "car",
    blurb:
      "A reliable hand with errands and getting to where you need to be.",
    items: [
      "Errands",
      "Grocery shopping",
      "Picking up prescriptions",
      "Post office visits",
      "Limited transportation",
      "Accompany to doctor appointments",
    ],
  },
  {
    slug: "medication-reminders",
    title: "Medication Reminders",
    icon: "pill",
    blurb:
      "Gentle, timely reminders that help keep medication routines on track.",
    items: ["Medication reminder"],
  },
  {
    slug: "respite-care",
    title: "Respite & Family Relief",
    icon: "clock",
    blurb:
      "Short-term relief so family caregivers can rest, knowing their loved one is in caring hands.",
    items: ["Respite / relief for families"],
  },
];

// Careers, wording grounded in the original Employment page.
export const CAREERS = {
  heading: "Build a fulfilling career in home care",
  intro:
    "Are you looking for a fulfilling career in the healthcare industry? Our growing team is searching for talented and passionate caregivers like you.",
  // Verbatim-aligned points from the Employment page.
  points: [
    {
      title: "More than just a job",
      text:
        "Joining our home care team is more than just a job, it's an opportunity to advance your career in the healthcare industry.",
      icon: "rocket",
    },
    {
      title: "Family-focused team",
      text:
        "We're a family-focused team that works closely with our clients and their families.",
      icon: "users",
    },
    {
      title: "Diversity, collaboration & excellence",
      text:
        "We value diversity and collaboration, and we strive for excellence in all that we do.",
      icon: "star",
    },
    {
      title: "Full-time & part-time",
      text:
        "Whether you're seeking full-time or part-time work, we have opportunities available.",
      icon: "clock",
    },
  ],
};
