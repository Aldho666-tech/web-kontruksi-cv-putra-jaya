# Website CV Putra Jaya — Mesin Industri Alas Kaki & Konstruksi

Website profil perusahaan dan katalog produk digital resmi untuk **CV Putra Jaya**, penyedia mesin industri manufaktur alas kaki dan peralatan konstruksi terpercaya yang berlokasi di Sentra Industri Cibaduyut, Bandung.

---

## 🚀 Fitur Utama

1. **Beranda Interaktif (`index.html`)**
   - **Hero Banner Modern:** Tampilan *full-width* dengan sudut bawah membulat (*bottom-rounded*), foto workshop autentik, serta kartu statistik reputasi (500+ Mesin Terpasang, 12+ Tahun Pengalaman).
   - **Marquee Running Text:** Menampilkan keunggulan layanan, kesiapan uji fungsi fisik, dan garansi resmi unit.
   - **Produk Unggulan:** Grid kartu mesin industri dengan label model, kategori, harga, tombol konsultasi WhatsApp langsung, dan tombol spesifikasi teknis.
   - **Profil Perusahaan & Komitmen:** Rincian standar pengujian mesin dan bengkel workshop di Cibaduyut.

2. **Katalog Produk Lengkap (`produk.html`)**
   - **Pencarian Cepat (*Live Search*):** Mencari mesin berdasarkan nama, model (cth: 27T, POST-810), atau spesifikasi listrik.
   - **Filter Kategori Dinamis:** Tab kategori dengan counter jumlah unit (Mesin Potong, Mesin Jahit, Mesin Press Sol, Mesin Lasting, Mesin Skiving).
   - **Mobile 2-Column E-Commerce Grid:** Tata letak grid 2 kolom sejajar di layar *smartphone* (serupa Tokopedia / Shopee) sehingga penjelajahan mesin lebih ringkas dan efisien.

3. **Modal Spesifikasi Teknis Mesin**
   - Pop-up detail spesifikasi mesin beresolusi tinggi dengan foto mesin terbingkai, label model, *tag* kesiapan unit, dan tabel spesifikasi teknis bergaris rapi (*zebra-striped*).
   - Tombol pemesanan via WhatsApp yang otomatis mengisi nama dan tipe mesin yang ditanyakan.

4. **Floating WhatsApp Button Interaktif**
   - Tombol bulat 60px dengan gelombang radar memancar (*pulsing wave ripple*).
   - Indikator status *online* aktif (*pulsing green dot*).
   - Kapsul teks interaktif *"Konsultasi Mesin ↗"* yang responsif saat disentuh / di-hover.

5. **Navigasi Mobile Floating Bar**
   - Bilah tab navigasi bawah mengambang yang bersih: **Beranda** dan **Produk** (ikon tas belanja / *shopping bag*).
   - Desain minimalis tanpa tab profil yang berlebih.

6. **Footer Elegan Sesuai Standar Industri**
   - Logo perusahaan berlatar putih bersih dengan slogan `ALAT KONSTRUKSI & MESIN`.
   - 4 kolom navigasi berhuruf kapital: Produk Mesin, Layanan, Tentang Kami, dan Hubungi Kami.
   - Garis pembatas horizontal tipis selebar kontainer.
   - Baris tombol sirkular ikon kontak dan media sosial (WhatsApp, Instagram, Google Maps Cibaduyut, Email, Katalog).
   - Hak cipta terpusat di bagian bawah.

---

## 🛠️ Struktur File & Teknologi

```text
├── index.html            # Halaman utama profil & produk unggulan
├── produk.html           # Halaman katalog lengkap & pencarian mesin
├── css/
│   └── style.css         # Styling modern, variabel CSS & responsive breakpoints
├── js/
│   ├── data.js           # Database JSON produk mesin & spesifikasi teknis
│   └── main.js           # Logika filter katalog, modal popup, animasi GSAP, & sinkronisasi navigasi
├── images/
│   ├── logo.png          # Logo resmi CV Putra Jaya
│   ├── favicon.png       # Favicon tab browser
│   ├── hero-warehouse.jpg # Foto workshop latar belakang hero
│   └── produk/           # Ilustrasi & visual mesin industri
├── .gitignore            # Konfigurasi file yang diabaikan Git
└── README.md             # Dokumentasi proyek
```

- **Teknologi:** Pure Vanilla HTML5, CSS3 (Modern Flexbox & CSS Grid), JavaScript ES6.
- **Tanpa Dependency Berat:** Dapat langsung dibuka di peramban web (*browser*) tanpa perlu langkah build, Node.js, atau instalasi paket tambahan.

---

## 📍 Kontak CV Putra Jaya

- **Alamat:** Sentra Industri Sepatu Cibaduyut, Bandung, Jawa Barat
- **WhatsApp:** +62 812-3456-7890
- **Email:** kontak@putrajayamesin.com
- **Website:** [CV Putra Jaya](https://github.com/Aldho666-tech/web-kontruksi-cv-putra-jaya)
