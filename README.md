# RasaKu — Food Ordering Frontend (Next.js App Router)

Frontend sistem order makanan dengan Next.js App Router + Tailwind CSS.

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur Folder

```
food-order-app/
├── app/
│   ├── layout.js          # Root layout + font Poppins + CartProvider
│   ├── page.js            # Home (Navbar, Hero, Kategori, Menu, Tentang, Footer)
│   ├── globals.css        # Tailwind + utility classes custom
│   ├── menu/page.js       # Halaman daftar menu lengkap + search + filter
│   ├── cart/page.js       # Halaman keranjang belanja
│   └── checkout/page.js   # Halaman checkout (form + ringkasan)
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── CategoryTabs.jsx
│   ├── MenuCard.jsx
│   ├── CartItem.jsx
│   └── Footer.jsx
├── context/
│   └── CartContext.jsx    # Context API untuk state keranjang (+ localStorage)
├── data/
│   └── menuData.js        # Data dummy kategori & menu makanan
├── tailwind.config.js      # Warna primary #1b4ea4 custom
└── package.json
```

## Catatan

- Styling menggunakan **Tailwind CSS** (bukan Bootstrap) sesuai bagian
  "Ketentuan Teknis" pada brief, yang secara eksplisit meminta konfigurasi
  `tailwind.config` dengan warna primary `#1b4ea4`. Jika project Bootstrap
  murni tetap dibutuhkan, beri tahu saya dan versi Bootstrap bisa dibuatkan
  terpisah.
- Semua data menu adalah dummy (lihat `data/menuData.js`), tidak ada
  backend/database.
- State keranjang menggunakan React Context API dan disimpan sementara di
  `localStorage` browser (bukan server) agar isi keranjang tidak hilang saat
  refresh halaman.
- Font: Poppins (via `next/font/google`), dengan fallback ke Inter/sans-serif.
