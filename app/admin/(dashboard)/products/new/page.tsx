export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import { Collection } from "@/lib/models/Collection";
import ProductForm from "@/components/admin/ProductForm";

async function getCollections() {
  await connectDB();
  return Collection.find({ active: true }).sort({ order: 1 }).lean();
}

export default async function NewProductPage() {
  const collections = await getCollections();
  const options = collections.map((c) => ({ id: c.id, label: c.label }));

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">Add Product</h1>
      <ProductForm collectionOptions={options} />
    </div>
  );
}