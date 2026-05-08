# Islamic Super App - Backend

Ini adalah backend untuk aplikasi Super App Keislaman, dibangun menggunakan:
- Node.js & Express.js
- TypeScript
- Prisma ORM & MySQL

## Prasyarat
- Node.js v18+
- MySQL Server

## Cara Menjalankan

1. Clone repositori ini (atau buka di editor Anda).
2. Install dependensi:
   ```bash
   npm install
   ```
3. Sesuaikan `DATABASE_URL` di file `.env` dengan kredensial MySQL Anda.
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/islamic_super_app"
   ```
4. Jalankan sinkronisasi database (opsional jika database sudah ada):
   ```bash
   npx prisma db push
   ```
   *Atau gunakan `npx prisma migrate dev` jika Anda ingin mengelola migrasi.*
5. Jalankan server backend:
   ```bash
   npm run dev
   ```

Aplikasi akan berjalan di `http://localhost:3000`.

## Endpoint API

- `GET /api/health` - Cek status server
- `GET /api/quran` - Mendapatkan data surah Al-Qur'an (statis JSOn)
- `GET /api/yasin` - Mendapatkan teks Surah Yasin (statis JSON)
- `GET /api/duas` - Mendapatkan doa sehari-hari (statis JSON)
