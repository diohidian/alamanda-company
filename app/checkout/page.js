"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/api/api";

function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

const paymentMethods = [
  { id: "tunai", label: "Tunai / Bayar di Tempat", icon: "💵", value: "cash"},
  // { id: "qris", label: "QRIS", icon: "📱" },
  // { id: "transfer", label: "Transfer Bank", icon: "🏦" },
];

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart, userData } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    user_id: "",
    surename: "",
    ordertype: "",
    table: "",
    notes: "",
    methodpayment: "",
  });

  const [itemorders, setItemOrders] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData?.id == null) return;
    setForm((currentForm) => ({ ...currentForm, user_id: userData.id }));
  }, [userData]);

  const ongkir = items.length > 0 ? 5000 : 0;
  const grandTotal = totalPrice + ongkir;

  useEffect(() => {
    setItemOrders(
      items.map((item) => ({
        menu_id: item.id,
        unit_price: item.price,
        subtotal: item.price * item.qty,
      })),
    );
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.surename.trim() || !form.ordertype.trim()) {
      setError("Mohon lengkapi nama dan tipe pesanan terlebih dahulu.");
      return;
    }

    if (itemorders.length === 0) {
      setError("Keranjang kosong. Tambahkan menu sebelum membuat pesanan.");
      return;
    }

    if (form.user_id === "") {
      setError("ID pengguna tidak ditemukan. Silakan login kembali.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await createOrder({ ...form }, itemorders);
      setSubmitted(true);
      clearCart();
    } catch {
      setError("Pesanan gagal dibuat. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !submitted) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="text-6xl">🧾</span>
          <h1 className="section-title mt-4">Keranjang masih kosong</h1>
          <p className="section-subtitle">
            Tambahkan menu terlebih dahulu sebelum checkout.
          </p>
          <Link href="/menu" className="btn-primary mt-6 inline-flex">
            Lihat Menu
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="text-6xl">🎉</span>
          <h1 className="section-title mt-4">Pesanan Berhasil Dibuat!</h1>
          <p className="section-subtitle">
            Terima kasih, {form.surename}. Pesananmu sedang kami siapkan.
          </p>
          <Link href="/menu" className="btn-primary mt-6 inline-flex">
            Pesan Lagi
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">Checkout</h1>
        <p className="section-subtitle text-center">
          Lengkapi data pemesanan sebelum konfirmasi.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Form data pemesan */}
          <div className="space-y-5 rounded-2xl bg-white p-6 shadow-soft lg:col-span-2">
            <h3 className="text-base font-semibold text-gray-900">
              Data Pemesan
            </h3>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-500">
                {error}
              </p>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="surename"
                value={form.surename}
                onChange={(e) => {
                  setForm({ ...form, surename: e.target.value });
                }}
                placeholder="cth. Budi Santoso"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Tipe Pesanan
              </label>
              <div className="flex gap-3">
                {[
                  { id: "dine-in", label: "Makan di Tempat" },
                  // { id: "delivery", label: "Antar ke Alamat" },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    value={opt.label}
                    onClick={(e) => setForm({ ...form, ordertype: e.target.value })}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      form.ordertype === opt.id
                        ? "border-primary bg-primary-50 text-primary"
                        : "border-gray-200 text-gray-600 hover:border-primary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                {form.ordertype === "dine-in" ? "Nomor Meja" : "Alamat Pengantaran"}
              </label>
              <input
                type="text"
                name="lokasi"
                value={form.table}
                onChange={(e) => {
                  setForm({ ...form, table: e.target.value });
                }}
                placeholder={
                  form.ordertype === "dine-in"
                    ? "cth. Meja 12"
                    : "cth. Jl. Merdeka No. 10, Purwosari"
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Catatan (opsional)
              </label>
              <textarea
                name="catatan"
                type="text"
                value={form.notes}
                onChange={(e) => {
                  setForm({ ...form, notes: e.target.value });
                }}
                rows={3}
                placeholder="cth. Tidak pedas, tanpa bawang"
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Metode Pembayaran
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {paymentMethods.map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    value={pm.value}
                    onClick={(e) => setForm({ ...form, methodpayment: e.target.value })}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-4 py-3 text-xs font-medium transition ${
                      form.methodpayment === pm.id
                        ? "border-primary bg-primary-50 text-primary"
                        : "border-gray-200 text-gray-600 hover:border-primary"
                    }`}
                  >
                    <span className="text-xl">{pm.icon}</span>
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ringkasan pesanan */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-soft lg:sticky lg:top-24">
            <h3 className="text-base font-semibold text-gray-900">
              Ringkasan Pesanan
            </h3>
            <div className="mt-4 max-h-56 space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.qty}x {item.name}
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatRupiah(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-dashed border-gray-200 pt-4 text-sm text-gray-600">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Memproses Pesanan..." : "Konfirmasi Pesanan"}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
