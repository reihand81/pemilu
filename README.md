# Pemilu Ketua BEM FH UNISBA 2025

Sistem pemungutan suara elektronik untuk pemilihan Ketua dan Wakil Ketua BEM Fakultas Hukum Universitas Islam Bandung tahun 2025.

## 🚀 Live Demo

Website dapat diakses di: [https://reihand81.github.io/pemilu/](https://reihand81.github.io/pemilu/)

## ✨ Fitur

- **Sistem Login Aman**: Autentikasi menggunakan NIM dan OTP
- **Profil Kandidat**: Informasi lengkap visi, misi, dan program kerja
- **Pemungutan Suara**: Interface voting yang user-friendly
- **Real-time Results**: Hasil sementara yang diperbarui secara real-time
- **Responsive Design**: Optimized untuk desktop dan mobile
- **Animasi Smooth**: Menggunakan Framer Motion untuk UX yang menarik

## 🛠️ Teknologi

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Animasi**: Framer Motion
- **Charts**: Recharts
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📱 Halaman

1. **Beranda**: Informasi umum dan countdown
2. **Profil Kandidat**: Detail lengkap setiap pasangan calon
3. **Login**: Sistem autentikasi dengan NIM dan OTP
4. **Verifikasi**: Konfirmasi data pemilih
5. **Pemungutan Suara**: Interface voting
6. **Hasil**: Real-time vote counting
7. **Completion**: Konfirmasi selesai voting

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/reihand81/pemilu.git
cd pemilu

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

Project ini menggunakan GitHub Actions untuk automatic deployment ke GitHub Pages. Setiap push ke branch `master` akan trigger deployment otomatis.

### Manual Deployment

```bash
# Build project
npm run build

# Deploy ke GitHub Pages
npm run deploy
```

## 🔒 Keamanan

- **Data Encryption**: Semua data sensitif dienkripsi
- **IP Logging**: Setiap aktivitas login dicatat
- **One-time Voting**: Satu NIM hanya bisa voting sekali
- **OTP Verification**: Verifikasi ganda dengan email

## 📊 Struktur Project

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── figma/          # Custom components
│   └── *.tsx           # Page components
├── styles/             # Global styles
├── assets/             # Static assets
└── guidelines/         # Development guidelines
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Project ini dibuat untuk keperluan internal BEM FH UNISBA 2025.

## 👥 Tim Pengembang

- **Frontend Developer**: [reihand81](https://github.com/reihand81)
- **UI/UX Design**: Tim BEM FH UNISBA
- **Project Manager**: Panitia Pemilu BEM FH UNISBA

## 📞 Kontak

Untuk pertanyaan atau dukungan teknis, hubungi:
- Email: bem.fhunisba@gmail.com
- Instagram: @bemfhunisba

---

**© 2025 BEM Fakultas Hukum Universitas Islam Bandung**