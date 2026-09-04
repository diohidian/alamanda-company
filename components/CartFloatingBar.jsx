"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

export default function CartFloatingBar() {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 animate-fadeInUp px-4 pb-4 sm:px-6">
      <Link
        href="/cart"
        className="mx-auto flex max-w-3xl items-center justify-between rounded-2xl bg-primary px-5 py-4 text-white shadow-softHover transition-transform duration-200 active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
            {totalItems}
          </span>
          <span className="text-sm font-semibold">Lihat Keranjang</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold">
          {formatRupiah(totalPrice)}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-4 w-4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
