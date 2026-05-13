export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/lib/models/Product";
import { Collection } from "@/lib/models/Collection";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

async function getData(id: string) {
  await connectDB();
  const [product, collections] = await Promise.all([
    Product.findById(id).lean(),
    Collection.find({ active: true }).sort({ order: 1 }).lean(),
  ]);
  return { product, collections };
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { product, collections } = await getData(id);
  if (!product) notFound();

  const options = collections.map((c) => ({ id: c.id, label: c.label }));
  const initialData = {
    _id: String(product._id),
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    collections: product.collections,
    images: product.images,
    badge: product.badge,
    description: product.description,
    inStock: product.inStock,
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">Edit Product</h1>
      <ProductForm initialData={initialData} collectionOptions={options} />
    </div>
  );
}