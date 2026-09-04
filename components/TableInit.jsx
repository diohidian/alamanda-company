"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * Saat pelanggan scan QR code di meja, URL akan berbentuk:
 * https://domain-kedai.com/?meja=12
 * Komponen ini membaca parameter tsb dan menyimpannya ke context,
 * supaya nomor meja ikut terbawa sampai proses checkout.
 */
export default function TableInit() {
  const searchParams = useSearchParams();
  const { setTableNumber } = useCart();

  useEffect(() => {
    const meja = searchParams.get("meja") || searchParams.get("table");
    if (meja) setTableNumber(meja);
  }, [searchParams, setTableNumber]);

  return null;
}
