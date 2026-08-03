"use client";
import ProductCard from "@/features/product/components/ProductCard";
import SidebarFilter from "@/features/product/components/SidebarFilter";
import TopBarDashboard from "@/features/product/components/TopBarDashboard";
import { getProductsAPI } from "@/features/product/services/productService";
import { Product } from "@/features/product/types/product.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [sortOption, setSortOption] = useState("featured");

  const [selectedRating, setSelectedRating] = useState(0);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await getProductsAPI();
        setProducts(productsData);

        const uniqueCategories = Array.from(
          new Set(productsData.map((item) => item.category)),
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Gagal memuat data dari API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    const matchesRating = (product.rating?.rate || 0) >= selectedRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "rating") return b.rating.rate - a.rating.rate;
    return 0;
  });

  return (
    <div className="px-4 md:px-24 py-8 bg-white min-h-screen">
      <TopBarDashboard
        totalProducts={products.length}
        showingCount={sortedProducts.length}
        onSortChange={(sort) => setSortOption(sort)}
      />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-72 shrink-0">
          <SidebarFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedRating={selectedRating}
            onSelectRating={setSelectedRating}
          />
        </aside>

        <main className="flex-1 w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="aspect-4/5 bg-gray-50 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-medium">
                Tidak ada produk yang sesuai dengan filter.
              </p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-medium">Produk &quot;{searchQuery}&quot; tidak ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
