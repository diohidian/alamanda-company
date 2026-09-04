import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        {/* Text */}
        <div className="animate-fadeInUp text-center md:text-left">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Sampurasunnnn 🍽️
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Rumah Makan Khas Sunda, <span className="text-primary">Alamanda</span> yang selalu jadi pilihan para wisatawan
          </h1>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">
            Nikmati hidangan lezat dari dapur kami yang menggunakan bahan-bahan segar dan berkualitas tinggi. Pesan sekarang dan rasakan pengalaman kuliner yang tak terlupakan!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
            <Link href="/menu" className="btn-primary w-full sm:w-auto">
              Pesan Sekarang
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/#promo" className="btn-outline w-full sm:w-auto">
              Lihat Promo
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 md:justify-start">
            <div>
              <p className="text-2xl font-bold text-gray-900">4.9<span className="text-primary">/5</span></p>
              <p className="text-xs text-gray-500">Rating Pelanggan</p>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-gray-900">8+</p>
              <p className="text-xs text-gray-500">Langganan Provinsi</p>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-gray-900">Catering</p>
              <p className="text-xs text-gray-500">Kami Siap Melayani</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 md:ml-auto md:h-96 md:w-96">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
            alt="Ilustrasi makanan"
            className="relative h-full w-full rounded-full object-cover shadow-softHover ring-8 ring-white"
          />
          <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft animate-fadeInUp">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-xs font-semibold text-gray-900">Best Seller</p>
              <p className="text-[11px] text-gray-500">Gurame Bakar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
