import Link from "next/link";

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/rm.alamanda/", icon: "https://i.pinimg.com/1200x/12/d7/52/12d752c2919daaf807d8b71f3dbed1a0.jpg" },
];

export default function Footer() {
  return (
    <footer id="kontak" className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img src="https://i.pinimg.com/736x/b5/62/0d/b5620de934f06a5b4449b9ac7db5c7f3.jpg" className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-soft" alt="Logo Rumah Makan Alamanda" />
              <span className="text-lg font-bold text-gray-900">
                Rumah Makan<span className="text-primary"> Alamanda</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Hidangan segar dan lezat, dipesan dengan mudah, tiba tepat
              waktu.
            </p>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Kontak</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>Obyek Wisata Situ Lengkong Panjalu, Ciamis, Jawa Barat</li>
              <li>+62 822-4094-9422</li>
              <li>rmalamanda123@gmail.com</li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Jam Operasional
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li className="flex justify-between gap-4">
                <span>Setiap Hari</span>
                <span>07.00 – 17.00</span>
              </li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Ikuti Kami
            </h4>
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base shadow-soft transition-all duration-200 hover:-translate-y-1 hover:bg-primary hover:text-white"
                >
                  <img src={s.icon} alt={s.name} className="h-full w-full object-cover" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Rumah Makan Alamanda. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
