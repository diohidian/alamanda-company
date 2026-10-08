"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

export default function MenuCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const description = item.desc ?? item.description ?? "";
  const imageUrl = item.image && item.image !== "null" ? item.image : "";

  const handleAdd = () => {
    addItem({ ...item, price: Number(item.price) });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="card-base group flex flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
            Gambar tidak tersedia
          </div>
        )}
        {item.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary shadow">
            🔥 Populer
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatRupiah(item.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 active:scale-95"
          >
            {justAdded ? "Ditambahkan" : "+ Keranjang"}
          </button>
        </div>
      </div>
    </div>
  );
}
