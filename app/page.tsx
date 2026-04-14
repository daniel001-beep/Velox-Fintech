import Link from "next/link";
export const dynamic = "force-dynamic";
import { InferSelectModel } from "drizzle-orm";
import { db } from "@/src/db";
import { products } from "@/src/db/schema";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";

export type Product = Omit<InferSelectModel<typeof products>, "price"> & {
  price: number;
};

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const featuredDb = await db.select().from(products).limit(8);
    return featuredDb.map((p) => ({ ...p, price: Number(p.price) }));
  } catch (err: any) {
    console.log("Database not seeded or tables missing.", err.message);
    return [];
  }
}

export default async function Home() {
  const featured: Product[] = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-[#050505] to-slate-950 py-32 md:py-40 shrink-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Discover Premium <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Curated collection of high-quality items delivered to your door with exceptional service
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/products" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Shop Now <i className="fa fa-arrow-right"></i>
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="flex-1 container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3">Featured Products</h2>
            <p className="text-gray-400 text-lg">Hand-picked selections just for you</p>
          </div>
          <Link href="/products" className="mt-6 md:mt-0 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10 flex items-center gap-2">
            View All <i className="fa fa-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featured.length > 0 ? (
            featured.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center bg-linear-to-b from-white/5 to-transparent border border-dashed border-white/10 rounded-2xl">
              <i className="fa fa-box-open text-5xl text-gray-600 mb-4"></i>
              <p className="text-gray-400 text-lg mb-4">No products available yet</p>
              <Link href="/api/seed" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all">Seed with Sample Products</Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}