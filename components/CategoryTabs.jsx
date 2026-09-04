"use client";

import { categories } from "@/data/menuData";

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
              isActive
                ? "border-primary bg-primary text-white shadow-soft"
                : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
