"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";

function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

export default function CartPage() {
  const { items, totalPrice, totalItems } = useCart();
  const ongkir = items.length > 0 ? 5000 : 0;
  const grandTotal = totalPrice + ongkir;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">Keranjang Belanja</h1>
        <p className="section-subtitle text-center">
          {totalItems > 0
            ? `${totalItems} item siap untuk dipesan.`
            : "Keranjangmu masih kosong."}
        </p>

        {items.length === 0 ? (
          <div className="mx-auto mt-14 flex max-w-sm flex-col items-center text-center">
            <span className="text-6xl">🛒</span>
            <p className="mt-4 text-sm text-gray-500">
              Belum ada item di keranjang. Yuk pilih menu favoritmu!
            </p>
            <Link href="/menu" className="btn-primary mt-6">
              Lihat Menu
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* List item */}
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Ringkasan */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-24">
              <h3 className="text-base font-semibold text-gray-900">
                Ringkasan Pesanan
              </h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} item)</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan</span>
                  <span>{formatRupiah(ongkir)}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between border-t border-dashed border-gray-200 pt-4 text-base font-bold text-gray-900">
                <span>Total</span>
                <span className="text-primary">{formatRupiah(grandTotal)}</span>
              </div>

              <Link
                href="/checkout"
                className="btn-primary mt-6 w-full"
              >
                Checkout
              </Link>
              <Link
                href="/menu"
                className="mt-3 block text-center text-xs font-medium text-gray-500 transition hover:text-primary"
              >
                + Tambah menu lain
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
