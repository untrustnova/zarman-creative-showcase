# Rencana Mockup Zarman Studio

## Tujuan

Membangun portofolio one-page yang modern, profesional, dan sinematik untuk Zarman Studio sebagai creative agency di bidang Video Editing, Graphic Design, dan 3D Animation. Fokus utama adalah membuat karya mudah dipreview, brand terasa kuat sejak layar pertama, dan pengalaman tetap responsif serta ringan.

## Arah visual

- Tema **Dark Cinematic**: hitam `#090909`, permukaan `#1A1A1A`, putih `#F7F7F7`, dan aksen merah `#FF2738` yang diterjemahkan ke semantic design tokens.
- Tipografi sans-serif tegas dengan heading display besar, body bersih, dan ritme ukuran variatif.
- Logo sementara berbentuk wordmark “ZARMAN / STUDIO”; struktur siap diganti dengan logo asli.
- Placeholder karya dibuat sebagai komposisi visual yang disengaja, bukan gambar template generik.
- Bentuk sudut relatif tajam, grid editorial, garis tipis, nomor indeks, dan ruang kosong untuk memberi karakter studio kreatif.

## Struktur halaman

1. **Navigasi minimal** — wordmark, tautan Work/Services/About/Contact, dan CTA kontak.
2. **Hero imersif** — nama Zarman Studio sebagai H1, positioning singkat, CTA melihat karya, serta scene Three.js merah-putih sebagai latar interaktif penuh.
3. **Showreel / Selected Work** — karya unggulan berskala besar dan kategori yang mudah dipindai.
4. **Video Editing** — embed YouTube placeholder yang dapat diputar langsung, dengan metadata proyek.
5. **Graphic Design** — galeri poster 4:5 responsif dengan komposisi editorial.
6. **3D Animation** — embed YouTube placeholder dan visual treatment yang membedakannya dari bagian video editing.
7. **Services / Capabilities** — Video Editor, Graphic Design, dan 3D Animation dalam susunan ringkas tanpa card bertumpuk.
8. **About / Studio statement** — profil singkat dan prinsip kerja.
9. **Contact** — CTA besar dengan nomor `+62 89519305701`, email `zarmanstudio@gmail.com`, dan Instagram `@zarman.creative` sebagai tautan aktif.
10. **Footer** — identitas singkat dan navigasi kembali ke atas.

## Interaksi dan animasi

- **Three.js** untuk satu scene hero utama: bentuk abstrak metalik/partikel merah yang bereaksi halus terhadap pointer.
- **GSAP + ScrollTrigger** untuk reveal heading, parallax terukur, pinning singkat, dan transisi antarbagian.
- **Lenis** untuk smooth scrolling yang disinkronkan dengan ScrollTrigger.
- **Motion for React** untuk microinteraction komponen, hover, dan transisi menu mobile.
- Semua animasi menghormati `prefers-reduced-motion`; scene 3D menurunkan DPR, jumlah objek, dan efek pada layar kecil/perangkat lambat.

## Responsif dan performa

- Lazy-load scene Three.js dan iframe YouTube; iframe menggunakan thumbnail/facade sampai pengguna menekan play bila memungkinkan.
- Hero memiliki fallback visual CSS ketika WebGL atau motion dinonaktifkan.
- Scene 3D berhenti ketika tidak terlihat, ukuran canvas stabil, dan tidak mengganggu keterbacaan teks.
- Layout diuji pada desktop dan mobile untuk memastikan tidak ada overlap, overflow, atau teks terpotong.

## Detail teknis

- Menggunakan arsitektur React/TanStack Start yang sudah tersedia di proyek, bukan mengganti router/framework; hasil visual dan perilaku tetap memenuhi intent frontend yang diminta.
- Menambahkan dependensi Three.js, GSAP, Lenis, dan Motion yang belum tersedia.
- Memisahkan scene 3D, facade video, galeri karya, navigasi, dan section konten menjadi komponen kecil.
- Menambahkan metadata unik untuk halaman utama: title, description, Open Graph, dan Twitter card.
- Menyimpan seluruh warna/shadow pada `src/styles.css` sebagai token semantik; komponen hanya menggunakan token tersebut.

## Validasi

- Memastikan halaman berhasil dikompilasi dan tidak memiliki error browser.
- Memeriksa rendering desktop dan mobile melalui browser, termasuk fallback animasi dan pemutaran preview video.
- Memastikan kontak dapat diklik, navigasi anchor bekerja, dan semua section tetap terbaca tanpa animasi.
