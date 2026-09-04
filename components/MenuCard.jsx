"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

export default function MenuCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="card-base group flex flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-primary shadow">
            🔥 Populer
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">{item.desc}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatRupiah(item.price)}
          </span>
         
        </div>
      </div>
    </div>
  );
}
