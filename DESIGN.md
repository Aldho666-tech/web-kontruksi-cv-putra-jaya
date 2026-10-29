# DESIGN.md — Website CV Putra Jaya

> Toko Mesin Produksi Sepatu — *Solusi Mesin Produksi & Industri*
> Referensi struktur: mesinindonesia.com (disederhanakan). Dokumen ini adalah spesifikasi desain + konten untuk dibangun (oleh developer / Claude Code / tool AI lain).

---

## 1. Tujuan & Prinsip

**Tujuan utama:** pengunjung (pemilik pabrik / pelaku industri sepatu) percaya pada CV Putra Jaya, melihat katalog mesin + harga, lalu **menghubungi via WhatsApp**.

**Prinsip desain**
1. **Minimalis** — hanya 2 halaman, sedikit elemen, banyak ruang kosong.
2. **Industrial & tegas** — hitam, putih, satu warna aksen kuning/amber.
3. **Satu CTA dominan** — tombol WhatsApp selalu mudah dijangkau (navbar + floating button).
4. **Foto produk adalah bintang** — latar putih bersih, ukuran foto seragam.
5. **Mobile-first** — mayoritas pengunjung membuka dari HP.

---

## 2. Struktur Halaman & Navbar

Navbar hanya **2 menu + 1 tombol CTA**:

| Menu | Halaman | Isi |
|---|---|---|
| **Beranda** | `/` | Hero, Produk Unggulan (preview), Kenapa Memilih Kami, Komitmen, Hubungi Kami + footer |
| **Produk** | `/produk` | Katalog lengkap mesin (foto, nama, harga, tombol tanya via WA) |
| *[Tombol] Hubungi via WhatsApp* | link `wa.me` | CTA di kanan navbar |

> Bagian "Hubungi Kami" ada di bagian bawah Beranda + footer (tidak butuh halaman sendiri). Tidak ada: Artikel, Karir, Layanan, mega-menu, dropdown.

---

## 3. Design Tokens

### Warna
| Token | Hex | Pemakaian |
|---|---|---|
| `--color-primary` | `#F5B301` | Aksen: tombol utama, garis bawah judul, ikon, hover |
| `--color-primary-dark` | `#D99A00` | Hover tombol utama |
| `--color-black` | `#111111` | Footer, teks judul, tombol sekunder |
| `--color-gray-900` | `#1F1F1F` | Overlay hero, section gelap |
| `--color-gray-600` | `#5B5B5B` | Teks paragraf |
| `--color-gray-200` | `#E6E6E6` | Border kartu, pemisah |
| `--color-gray-50` | `#F7F7F7` | Latar section selang-seling |
| `--color-white` | `#FFFFFF` | Latar utama, teks di atas gelap |
| `--color-wa` | `#25D366` | Khusus tombol WhatsApp floating |

### Tipografi
- **Font:** `Poppins` (Google Fonts) — fallback `system-ui, sans-serif`. Bobot 400, 500, 600, 700.
- Skala (desktop / mobile):
  - H1 hero: 48px / 30px, bold, line-height 1.2
  - H2 section: 32px / 24px, semibold, **diikuti garis kuning 60×3px di bawahnya, rata tengah**
  - H3 kartu: 18px / 16px, semibold
  - Body: 16px / 15px, line-height 1.7
  - Caption/harga kecil: 14px

### Spacing, Radius, Shadow
- Spacing skala 8px: 8 / 16 / 24 / 32 / 48 / 64 / 96.
- Padding section: **96px** vertikal desktop, **56px** mobile.
- Container max-width: **1200px**, padding samping 24px (mobile 16px).
- Radius: kartu `12px`, tombol `999px` (pill), gambar `8px`.
- Shadow kartu: `0 2px 12px rgba(0,0,0,.06)`; hover `0 8px 24px rgba(0,0,0,.12)`.

### Breakpoint
`sm 640` · `md 768` · `lg 1024` · `xl 1280`

---

## 4. Komponen

### 4.1 Navbar
- Sticky di atas, tinggi 72px, latar putih, border-bawah `gray-200`.
- Kiri: **logo teks "CV PUTRA JAYA"** (bold, hitam; "JAYA" boleh warna primary) + tagline kecil di bawah (opsional, desktop saja).
- Tengah/kanan: link `Beranda`, `Produk` (aktif = teks primary + underline 2px).
- Kanan: tombol pill **"Hubungi Kami"** (latar primary, teks hitam) → `https://wa.me/62XXXXXXXXXX`.
- Mobile: logo + hamburger; panel menu turun penuh lebar berisi 2 link + tombol WA.

### 4.2 Tombol
- **Primary:** latar `primary`, teks hitam, pill, padding 12×28, hover `primary-dark`.
- **Secondary (outline):** border 2px putih/hitam, teks sama, hover terisi.
- **WA Floating:** lingkaran 56px hijau `--color-wa`, pojok kanan bawah (24px dari tepi), ikon WhatsApp putih, muncul di semua halaman.

### 4.3 Kartu Produk
- Rasio gambar **1:1**, `object-fit: contain`, latar putih, padding 16px.
- Isi: gambar → nama mesin (H3) → harga (bold, hitam; format `Rp 12.500.000`) → tombol kecil **"Tanya via WhatsApp"**.
- Link WA berisi pesan otomatis: `Halo CV Putra Jaya, saya tertarik dengan [Nama Mesin]. Bisa info lebih lanjut?` (di-URL-encode).
- Hover: naik 4px + shadow lebih tebal.
- Jika harga belum ada → tampilkan **"Hubungi untuk harga"**.

### 4.4 Kartu Keunggulan (Kenapa Memilih Kami)
- Ikon garis 48px (warna primary) di atas, judul 16px semibold, deskripsi 1 baris abu.
- Tanpa border; rata tengah.

### 4.5 Footer
- Latar hitam, teks putih/abu.
- 2 kolom (desktop): kiri nama perusahaan + alamat/telepon/email; kanan menu (Beranda, Produk). Baris bawah: `© 2026 CV Putra Jaya. All rights reserved.`

---

## 5. Halaman 1 — Beranda (`/`)

Urutan section dari atas ke bawah:

### 5.1 Hero (tinggi ±560px desktop, 480px mobile)
- Latar: foto pabrik/mesin (gelap) + overlay `rgba(17,17,17,.65)`. *(Placeholder: foto mesin sepatu milik sendiri.)*
- Konten rata tengah:
  - Eyebrow kecil (primary, uppercase): `CV PUTRA JAYA`
  - **H1:** `Selamat Datang di CV Putra Jaya`
  - **Sub-judul (H1 kedua / besar):** `Mesin Produksi Sepatu Terlengkap di Indonesia`
  - Paragraf (maks. 3 baris, putih 90%): *"CV PUTRA JAYA adalah penyedia mesin industri yang berfokus pada kebutuhan manufaktur, khususnya industri alas kaki dan produksi sepatu. Dengan mengutamakan efisiensi, transparansi, dan kebutuhan pelanggan, kami berupaya menjadi mitra permesinan yang dapat diandalkan oleh pabrik dan pelaku industri."*
  - 2 tombol: **[Lihat Produk]** (primary → `/produk`) · **[Hubungi Kami]** (outline putih → WhatsApp)

### 5.2 Produk & Layanan (preview)
- Judul H2: `Produk & Layanan` (+ garis kuning).
- Grid **4 kartu produk** (Mesin A, B, C, D) — desktop 4 kolom, tablet 2, mobile 2.
- Di bawah grid: tombol outline **"Lihat Semua Produk →"** → `/produk`.
- Data diisi dari file produk (lihat bagian 7).

### 5.3 Kenapa Harus Memilih Kami?
- Latar `gray-50`. H2: `Kenapa Harus Memilih Kami?`
- Grid 5 kartu keunggulan (desktop 5 kolom → tablet 3 → mobile 1/2):

| Ikon (saran) | Judul | Deskripsi singkat |
|---|---|---|
| medali / award | **Berpengalaman & Terpercaya** | Dipercaya pelaku industri alas kaki. |
| pabrik / gedung | **Sudah Banyak Bekerjasama** | Telah mensuplai mesin ke berbagai pabrik. |
| centang perisai | **Berkualitas & Terjamin** | Mesin diperiksa sebelum sampai ke Anda. |
| garansi / dokumen | **Bergaransi** | Garansi untuk ketenangan investasi Anda. |
| kotak / gear | **Stok Mesin & Suku Cadang Tersedia** | Pengiriman cepat, perawatan lebih mudah. |

### 5.4 Komitmen Kami
- Layout 2 kolom: kiri teks, kanan foto (mesin/gudang). Mobile: foto di atas.
- H2 (rata kiri): `Komitmen Kami`
- Teks: *"Kami percaya bahwa mesin yang tepat merupakan salah satu faktor penting dalam mendukung kelancaran produksi. Karena itu, CV Putra Jaya berkomitmen menyediakan pilihan permesinan dengan memperhatikan kondisi mesin, kebutuhan pelanggan, serta nilai investasi jangka panjang."*

### 5.5 Hubungi Kami (CTA band)
- Latar **primary (kuning)**, teks hitam, rata tengah, padding 72px.
- H2: `Hubungi Kami`
- Teks: *"Sedang mencari mesin produksi atau membutuhkan solusi peremajaan mesin industri? Hubungi CV Putra Jaya untuk mendiskusikan kebutuhan permesinan perusahaan Anda."*
- Tombol hitam besar: **[Chat WhatsApp Sekarang]**.
- Di bawahnya 3 baris info (ikon + teks): Telepon/WhatsApp · Alamat · Email.

### 5.6 Footer (lihat 4.5)
- Opsional: embed Google Maps (tinggi 200px) di kolom kiri footer seperti referensi. Kalau belum mau, lewati.

---

## 6. Halaman 2 — Produk (`/produk`)

- **Page header** pendek (tinggi 200px, latar `gray-900`, teks putih): H1 `Produk Kami`, sub: `Mesin produksi sepatu & industri — hubungi kami untuk ketersediaan stok.`
- **Filter kategori** (tab pill rata tengah, opsional tapi disarankan bila produk >8): `Semua` · `[Kategori 1]` · `[Kategori 2]` … Tab aktif = latar primary. Filter dilakukan di sisi klien (tanpa reload).
- **Grid produk:** 4 kolom desktop · 3 tablet · 2 mobile, gap 24px. Memakai kartu produk (4.3).
- Opsional: klik kartu membuka **modal/detail** berisi foto besar, nama, harga, spesifikasi singkat, tombol WA. Jika ingin paling minimalis: tanpa modal, hanya tombol WA di kartu.
- Di akhir halaman: CTA band "Tidak menemukan mesin yang dicari? Hubungi kami." + footer.

---

## 7. Data Produk (diisi nanti)

Satu sumber data (`products.json` atau array di kode) agar mudah diedit tanpa ubah desain:

```json
[
  {
    "id": "mesin-a",
    "name": "Mesin A",
    "category": "Kategori",
    "price": 0,
    "image": "/images/produk/mesin-a.jpg",
    "description": "Deskripsi singkat 1 kalimat (opsional)",
    "featured": true
  }
]
```

- `price: 0` atau `null` → tampil "Hubungi untuk harga".
- `featured: true` → tampil di preview Beranda (ambil 4 pertama).
- **Aturan foto:** latar putih/polos, rasio 1:1, minimal 800×800px, format `.webp` / `.jpg`, nama file huruf kecil tanpa spasi.

---

## 8. Interaksi & Animasi (tetap ringan)

- Fade-in + naik 12px saat section masuk viewport (200–300ms, sekali saja).
- Hover kartu & tombol: transisi 200ms.
- Smooth scroll untuk anchor. Hormati `prefers-reduced-motion`.
- Tidak ada slider/carousel otomatis, tidak ada popup.

---

## 9. Responsif

| Elemen | Mobile (<768) | Desktop (≥1024) |
|---|---|---|
| Navbar | Logo + hamburger | Logo, 2 link, tombol CTA |
| Hero H1 | 30px | 48px |
| Grid produk | 2 kolom | 4 kolom |
| Keunggulan | 1–2 kolom | 5 kolom |
| Komitmen | Tumpuk (foto atas) | 2 kolom |
| Tombol WA | Floating tetap tampil | Floating tetap tampil |

Target tap minimal 44×44px.

---

## 10. SEO, Performa & Aksesibilitas

- `<title>`: `CV Putra Jaya — Toko Mesin Produksi Sepatu Terlengkap di Indonesia`
- `meta description`: ±155 karakter dari paragraf hero.
- Heading hierarki benar (1 H1 per halaman), `alt` deskriptif di semua foto (`"Mesin [nama] CV Putra Jaya"`).
- Kata kunci alami: *mesin produksi sepatu, mesin sepatu, mesin industri alas kaki, toko mesin sepatu*.
- Tambah `schema.org/LocalBusiness` (nama, alamat, telepon) dan Open Graph image.
- Lazy-load gambar di bawah fold, gunakan `.webp`, target skor Lighthouse ≥ 90.
- Kontras teks minimal WCAG AA (teks hitam di atas kuning = aman; jangan teks putih di atas kuning).

---

## 11. Saran Teknis

- **Paling simpel:** HTML + Tailwind CSS (statis), deploy gratis di Netlify / Vercel / Cloudflare Pages.
- **Alternatif:** Next.js / Astro dengan `products.json` bila ingin mudah update katalog.
- Domain saran: `putrajayamesin.com` / `.co.id`.
- Analytics opsional: Google Analytics + pelacakan klik tombol WhatsApp.

---

## 12. Checklist yang Perlu Dilengkapi Pemilik

- [ ] Logo CV Putra Jaya (SVG/PNG transparan) — sementara pakai teks
- [ ] Nomor WhatsApp (format `62812xxxxxxx`)
- [ ] Alamat usaha lengkap + link Google Maps
- [ ] Email perusahaan
- [ ] Foto hero (mesin / gudang / pabrik)
- [ ] Foto, nama, kategori, dan harga setiap mesin
- [ ] Foto section Komitmen (opsional)
- [ ] Detail garansi (durasi/syarat) bila ingin dicantumkan
- [ ] Logo pabrik pelanggan (bila diizinkan) — bisa ditambah section "Pelanggan Kami" nanti

---

## 13. Yang Sengaja Dihilangkan dari Referensi

Agar tetap minimalis, tidak dipakai: bar menu kedua berwarna kuning, banyak kategori ikon, video profil YouTube, halaman Artikel/Karir/Layanan, badge "HOT", dan section sertifikasi (TKDN/SNI) — bisa ditambahkan nanti hanya jika CV memang memilikinya.