import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Alamanda — Rumah Makan Khas Sunda",
  description:
    "Nikmati hidangan lezat dari Rumah Makan Alamanda, restoran khas Sunda yang menyajikan makanan segar dan berkualitas tinggi. Pesan sekarang dan rasakan pengalaman kuliner yang tak terlupakan!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
