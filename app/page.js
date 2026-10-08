"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuCard from "@/components/MenuCard";
import Footer from "@/components/Footer";
import { getMenus } from "@/api/api";

export default function HomePage() {
  const [menuData, setMenuData] = useState([]);
  const [activeCategory] = useState("all");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menus = await getMenus();
        setMenuData(menus);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  const filteredItems = useMemo(() => {
    const source =
      activeCategory === "all"
        ? menuData
        : menuData.filter((item) => item.category === activeCategory);

    return source.slice(0, 8);
  }, [activeCategory, menuData]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Kategori & Menu Preview */}
        <section id="promo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Jelajahi Menu Kami</h2>
            <p className="section-subtitle">
              Pilih kategori favoritmu dan temukan hidangan yang cocok untuk
              selera hari ini.
            </p>
          </div>

          {/* <div className="mt-8">
            <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
          </div> */}

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/menu" className="btn-outline">
              Lihat Semua Menu
            </Link>
          </div>
        </section>

        {/* Tentang */}
        <section id="tentang" className="bg-primary-50/50 py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <img
              src="https://i.pinimg.com/736x/d7/7e/32/d77e32e896498002aba9965f2bb4591f.jpg"
              alt="Dapur Rumah Makan Alamanda"
              className="h-72 w-full rounded-3xl object-cover shadow-soft"
            />
            <div>
              <h2 className="section-title">Tentang Rumah Makan Alamanda</h2>
              <p className="section-subtitle">
                Rumah Makan Alamanda adalah destinasi kuliner yang menyajikan hidangan khas Sunda dengan cita rasa autentik. Kami berkomitmen untuk menggunakan bahan-bahan segar dan berkualitas tinggi, memastikan setiap hidangan yang kami sajikan memuaskan selera Anda.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Bahan segar setiap hari
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Proses pesan cepat & mudah
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>  Rasakan pengalaman kuliner yang tak terlupakan
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
