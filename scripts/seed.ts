import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Collection } from "../lib/models/Collection";
import { Product } from "../lib/models/Product";
import { COLLECTIONS, PRODUCTS } from "../lib/data";

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("Connected to MongoDB");

  await Collection.deleteMany({});
  await Product.deleteMany({});

  const staticCols = COLLECTIONS.filter((c) => c.id !== "all");
  await Collection.insertMany(
    staticCols.map((c, i) => ({ id: c.id, label: c.label, order: i, active: true }))
  );
  console.log(`Seeded ${staticCols.length} collections`);

  await Product.insertMany(
    PRODUCTS.map((p) => ({
      name: p.name,
      slug: slugify(p.name),
      price: p.price,
      originalPrice: p.originalPrice,
      collections: p.collections,
      images: [p.image],
      badge: p.badge,
      description: p.description,
      inStock: true,
    }))
  );
  console.log(`Seeded ${PRODUCTS.length} products`);

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((e) => { console.error(e); process.exit(1); });