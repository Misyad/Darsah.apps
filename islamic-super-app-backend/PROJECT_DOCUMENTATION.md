# Dokumentasi Proyek: Islamic Super App

Proyek ini adalah ekosistem aplikasi Islami komprehensif (Super App) yang terbagi menjadi dua bagian utama: **Frontend (Darsah Apps)** dan **Backend**. Aplikasi ini dirancang untuk memenuhi kebutuhan ibadah harian umat Islam dengan antarmuka modern yang terinspirasi oleh NU Online.

---

## 1. Arsitektur Frontend (Darsah Apps)

Darsah Apps adalah aplikasi antarmuka pengguna berbasis web modern (PWA-ready) dengan pendekatan *Mobile-First Design*.

### ✨ Fitur Utama
- **Al-Qur'an Digital**: 114 Surah lengkap (teks Arab, Latin, Terjemahan) dengan penyimpanan riwayat bacaan terakhir.
- **Jadwal Shalat & Kiblat**: Jadwal real-time berdasarkan geolokasi dan penunjuk arah Ka'bah interaktif.
- **Khazanah Doa & Wirid (Kanuz as-Sa'adah)**: Koleksi lengkap doa harian, dzikir setelah shalat, wirid para imam (Al-Haddad, Al-Attas, Nawawi), dan amaliyah bulan-bulan Hijriah (Rajab, Sya'ban, Ramadhan, dll).
- **Layanan Lainnya**: Kalkulator Zakat komprehensif, Ziarah Wali (terintegrasi peta), Kalender Hijriah & Jawa.
- **Konten Edukasi**: Artikel Islami, NUpedia, Khutbah Jumat, Video Kajian, dan Kalam (Quotes).

### 🚀 Teknologi (Tech Stack)
- **Framework**: React 18, Vite, TypeScript
- **Styling**: Vanilla CSS (Premium Mobile-First Design), mendukung *Dark Mode*.
- **Routing & State**: React Router DOM, React Context API.
- **Icons**: Lucide React.
- **Integrasi Eksternal**:
  - AlAdhan API (Jadwal Shalat)
  - Al-Quran Cloud API (Teks Al-Qur'an & Terjemahan)
  - OpenStreetMap Nominatim (Geolokasi)

---

## 2. Arsitektur Backend

Backend bertugas melayani data terpusat, mengelola monetisasi (seperti Zakat, Infaq, Sadaqah), fitur premium, dan webhook pembayaran.

### ✨ Fitur & Layanan API
- **Layanan Data Statis (Freemium)**:
  - `GET /api/quran` - Data surah Al-Qur'an (JSON statis)
  - `GET /api/yasin` - Teks Surah Yasin
  - `GET /api/duas` - Doa sehari-hari
- **Layanan Transaksional & Premium (Rangkaian 3)**:
  - `POST /api/donate` - Gateway pembayaran ZIS (Zakat, Infaq, Sadaqah)
  - `POST /api/webhook/payment` - Webhook callback dari Payment Gateway (misal: Midtrans)
  - `GET /api/premium/audio` - Fitur premium murottal audio (membutuhkan otentikasi)
  - `GET /api/ads` - Sistem iklan terkurasi / Marketplace Islami

### 🚀 Teknologi (Tech Stack)
- **Runtime & Framework**: Node.js v18+, Express.js, TypeScript
- **Database & ORM**: MySQL, Prisma ORM (`dev.db` tersedia untuk development awal)
- **Security & Utils**: CORS, Helmet, Dotenv

---

## 3. Panduan Pengembangan Lokal

Untuk menjalankan ekosistem ini secara lokal, pastikan **Node.js** dan **MySQL** (untuk backend) sudah terinstal.

### Menjalankan Backend
1. Buka terminal di folder `islamic-super-app-backend`.
2. Install dependensi: `npm install`
3. Konfigurasi environment: Buat/sesuaikan file `.env` dengan `DATABASE_URL` MySQL Anda.
4. (Opsional) Push skema database: `npx prisma db push`
5. Jalankan server: `npm run dev`
6. Backend akan berjalan di: **http://localhost:4000** (atau sesuai port di `.env`).

### Menjalankan Frontend
1. Buka terminal baru di folder `darsah-apps`.
2. Install dependensi: `npm install`
3. Jalankan server pengembangan: `npm run dev`
4. Akses aplikasi melalui browser di: **http://localhost:5173** (Disarankan menggunakan *Responsive Design Mode* ukuran mobile/smartphone).

---

## 4. Daftar Konten Doa & Amaliyah (Kanuz as-Sa'adah)

Aplikasi ini mengintegrasikan konten dari Kitab *Kanuz as-Sa'adah* yang mencakup:

### 🌞 Dzikir & Doa Harian
- Adab & Doa Bangun Tidur & Sebelum Tidur
- Doa setelah Wudhu
- Doa Tahajjud & Shalat Fajar
- Dzikir & Doa setelah Shalat Fardhu (Subuh, Dzuhur, Ashar, Maghrib, Isya)
- Wirdul Lathif, Ratibul Haddad, Ratibul Attas
- Wirdul Imam Nawawi, Wirdul Sakran
- Hizbun Nashr (Imam Syadzili & Habib Abdullah Al-Haddad)
- Doa Shalat Dhuha, Istikharah, Shalat Tasbih, Shalat Hajat

### 🌙 Amaliyah Bulan Hijriah
- **Muharram**: Doa Awal Tahun, Puasa Asyura & Tasu'a.
- **Rajab**: Istighfar & Puasa Rajab.
- **Sya'ban**: Amalam Nisfu Sya'ban & Doanya.
- **Ramadhan**: Doa Buka Puasa, Tarawih, Witir, & Lailatul Qadar.
- **Syawal**: Puasa 6 Hari.
- **Dzulhijjah**: Puasa Arafah & Doa Akhir Tahun.

### 📖 Surah Pilihan & Khusus
- Surah Yasin, Al-Waqi'ah, Al-Mulk, As-Sajdah, Al-Kahf, Ad-Dukhan (Beserta Doanya).
- Doa Khatam Al-Qur'an & Doa Penghafal Al-Qur'an.

### 🤝 Adab & Sosial
- Doa Birrul Walidain (Berbakti kepada Orang Tua).
- Khutbah Nikah & Tata Cara Jenazah (Tahlil, Shalat Jenazah, Talqin).
- Qasidah-qasidah Pilihan (Burda, Muhammadiyah, Asmaul Husna, dll).

---
*Dokumentasi ini di-generate secara otomatis berdasarkan struktur repositori terkini.*
