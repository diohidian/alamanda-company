"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function TopBar() {
  const { totalItems, tableNumber } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo & nama kedai */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-soft">
            🍔
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-gray-900">
              Rasa<span className="text-primary">Ku</span>
            </p>
            <p className="text-[11px] text-gray-400">Pesan langsung dari meja</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Badge nomor meja */}
          {tableNumber && (
            <span className="hidden items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
              >
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
              </svg>
              Meja {tableNumber}
            </span>
          )}

          {/* Ikon Keranjang */}
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary transition-all duration-200 hover:bg-primary hover:text-white active:scale-95"
            aria-label="Keranjang belanja"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white shadow">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Badge nomor meja versi mobile (di bawah baris atas) */}
      {tableNumber && (
        <div className="border-t border-gray-50 bg-primary-50/60 px-4 py-1.5 text-center text-xs font-medium text-primary sm:hidden">
          📍 Anda memesan dari Meja {tableNumber}
        </div>
      )}
    </header>
  );
}
