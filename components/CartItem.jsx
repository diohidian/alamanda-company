"use client";

import { useCart } from "@/context/CartContext";

function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-soft sm:p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
      />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
          {item.name}
        </h4>
        <p className="text-sm font-bold text-primary">
          {formatRupiah(item.price)}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-gray-200">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 active:scale-90"
              aria-label="Kurangi jumlah"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium">
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 active:scale-90"
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-xs font-medium text-red-500 transition hover:text-red-600"
          >
            Hapus
          </button>
        </div>
      </div>

      <div className="hidden text-sm font-bold text-gray-900 sm:block">
        {formatRupiah(item.price * item.qty)}
      </div>
    </div>
  );
}
