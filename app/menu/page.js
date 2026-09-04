"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import MenuCard from "@/components/MenuCard";
import { categories, menuItems } from "@/data/menuData";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        activeCategory === "semua" || item.category === activeCategory;
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="section-title">Daftar Menu</h1>
          <p className="section-subtitle">
            Semua hidangan lezat kami ada di sini. Pilih, tambahkan ke
            keranjang, dan pesan sekarang!
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-soft transition focus-within:border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 shrink-0 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Cari menu favoritmu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="mt-8">
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        </div>

        {filteredItems.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center text-gray-400">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 text-sm">Menu tidak ditemukan.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
