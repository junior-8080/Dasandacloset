import { Truck, Gem, ShoppingBag, Sparkles } from "lucide-react";

// ─── Shop Data ────────────────────────────────────────────────────────────────

export const COLLECTIONS = [
  { id: "all", label: "All" },
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "eid", label: "Eid Collection" },
  { id: "best-sellers", label: "Best Sellers" },
  { id: "abayas", label: "Abayas" },
  { id: "kaftans", label: "Kaftans" },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  collections: string[];
  image: string;
  badge?: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Pearl Embroidered Abaya",
    price: 480,
    collections: ["abayas", "best-sellers"],
    image: "/landingPage/bestSeller.jpeg",
    badge: "Best Seller",
    description: "Flowing black abaya with delicate pearl embroidery at the cuffs and neckline.",
  },
  {
    id: "p2",
    name: "Eid Blossom Kaftan",
    price: 620,
    originalPrice: 750,
    collections: ["kaftans", "eid", "new-arrivals"],
    image: "/landingPage/newArrivals.jpeg",
    badge: "Eid Special",
    description: "Rich fabric kaftan adorned with floral prints — perfect for Eid celebrations.",
  },
  {
    id: "p3",
    name: "Classic Linen Modest Dress",
    price: 340,
    collections: ["best-sellers", "new-arrivals"],
    image: "/landingPage/madeToFit.jpeg",
    badge: "New",
    description: "Breathable linen dress with a flattering A-line silhouette, ideal for everyday modest wear.",
  },
  {
    id: "p4",
    name: "Golden Hour Kaftan",
    price: 540,
    collections: ["kaftans", "eid"],
    image: "/landingPage/bestSeller.jpeg",
    badge: "Eid Special",
    description: "Luxurious gold-trimmed kaftan that brings radiance to any gathering.",
  },
  {
    id: "p5",
    name: "Midnight Velvet Abaya",
    price: 720,
    collections: ["abayas", "new-arrivals"],
    image: "/landingPage/newArrivals.jpeg",
    badge: "New",
    description: "Deep midnight velvet abaya with satin lining — opulence redefined.",
  },
  {
    id: "p6",
    name: "Sage Wrap Modest Dress",
    price: 290,
    collections: ["best-sellers"],
    image: "/landingPage/madeToFit.jpeg",
    badge: "Best Seller",
    description: "Soft sage wrap dress with elegant drape — effortlessly modest and stylish.",
  },
  {
    id: "p7",
    name: "Rose Silk Kaftan",
    price: 590,
    originalPrice: 680,
    collections: ["kaftans", "new-arrivals"],
    image: "/landingPage/bestSeller.jpeg",
    badge: "New",
    description: "Silky rose kaftan with hand-finished edges, perfect for formal occasions.",
  },
  {
    id: "p8",
    name: "Eid Ivory Abaya Set",
    price: 850,
    collections: ["abayas", "eid"],
    image: "/landingPage/newArrivals.jpeg",
    badge: "Eid Special",
    description: "Coordinated ivory abaya and inner dress — the ultimate Eid statement piece.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/#story" },
  { label: "Dashboard", href: "#" },
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