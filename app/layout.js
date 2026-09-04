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
  title: "RasaKu — Pesan Makanan Online",
  description:
    "Pesan makanan favoritmu dengan mudah dan cepat di RasaKu. Segar, lezat, dan diantar tepat waktu.",
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
