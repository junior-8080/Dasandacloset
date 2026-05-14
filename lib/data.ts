import { Truck, Gem, ShoppingBag, Sparkles } from "lucide-react";

// ─── Shop Data ────────────────────────────────────────────────────────────────

export type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  collections: string[];
  images: string[];
  badge?: string;
  description: string;
  inStock: boolean;
  slug: string;
};


export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/#story" },
];

export const OFFERINGS = [
  {
    icon: "👗",
    title: "Modest Clothing",
    description:
      "Elegantly crafted abayas, kaftans, and modest dresses that celebrate femininity without compromise.",
    image:
      "/landingPage/bestSeller.jpeg",
    tag: "Best Seller",
  },
  {
    icon: "👘",
    title: "One-of-a-Kind Craftsmanship",
    description:
      "Technically, bespoke means a garment was made from scratch to a customer's specific measurements and requirements.",
    image:
      "/landingPage/newArrivals.jpeg",
    tag: "New Arrivals",
  },
  {
    icon: "✂️",
    title: "Made-to-Fit",
    description:
      "Bespoke tailoring that ensures every piece fits your silhouette perfectly. Your measurements, our craft.",
    image:
      "/landingPage/madeToFit.jpeg",
    tag: "Premium",
  },
];

export const ADVANTAGES = [
  {
    Icon: Truck,
    title: "Nationwide Delivery",
    description:
      "Fast, reliable delivery across all regions of Ghana and West Africa.",
  },
  {
    Icon: Gem,
    title: "Quality Fabric",
    description:
      "Only premium, carefully sourced fabrics that stand the test of time.",
  },
  {
    Icon: ShoppingBag,
    title: "Wholesale & Retail",
    description:
      "Flexible deals for individual shoppers and bulk buyers alike.",
  },
  {
    Icon: Sparkles,
    title: "Free Styling Tips",
    description:
      "Personalised fashion advice from our expert stylists — at no extra cost.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Amina K.",
    location: "Accra, Ghana",
    rating: 5,
    text: "Dasanda Closet completely transformed my wardrobe. The quality is unmatched and the styling tips helped me build a look I'm truly proud of.",
    avatar: "AK",
  },
  {
    name: "Fatima S.",
    location: "Kumasi, Ghana",
    rating: 5,
    text: "The made-to-fit service is outstanding. My dress arrived perfectly tailored — I've never felt more confident and elegant.",
    avatar: "FS",
  },
  {
    name: "Zainab M.",
    location: "Tamale, Ghana",
    rating: 5,
    text: "From the beautiful packaging to the gorgeous fabric, every detail screams luxury. My go-to for modest fashion in Ghana.",
    avatar: "ZM",
  },
  {
    name: "Halima O.",
    location: "Takoradi, Ghana",
    rating: 5,
    text: "I ordered wholesale for my boutique and the quality was incredible. My customers are already asking for more. Highly recommend!",
    avatar: "HO",
  },
];