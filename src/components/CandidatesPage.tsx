import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Play, Users, Target, Award, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CandidatesPageProps {
  onNavigate: (page: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

export function CandidatesPage({ onNavigate }: CandidatesPageProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  const candidates = [
    {
      id: 1,
      number: "01",
      ketua: {
        name: "Ahmad Fauzan",
        nim: "20210001",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
      },
      wakil: {
        name: "Siti Nurhaliza",
        nim: "20210002", 
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop"
      },
      visi: "Mewujudkan BEM FH UNISBA yang Inovatif, Aspiratif, dan Berintegritas",
      misi: [
        "Meningkatkan kualitas akademik mahasiswa melalui program studi banding",
        "Mengoptimalkan fungsi BEM sebagai wadah aspirasi mahasiswa",
        "Membangun kerjasama dengan berbagai instansi hukum",
        "Mengembangkan soft skill mahasiswa melalui pelatihan dan workshop"
      ],
      programs: [
        "Legal Clinic untuk masyarakat",
        "Kompetisi debat hukum nasional",
        "Magang bersertifikat di firma hukum"
      ],
      experience: [
        "Ketua Himpunan Mahasiswa Jurusan 2023",
        "Peserta Kompetisi Peradilan Semu Nasional 2022",
        "Volunteer di Legal Aid UNISBA"
      ],
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      number: "02", 
      ketua: {
        name: "Budi Santoso",
        nim: "20210003",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
      },
      wakil: {
        name: "Rina Permata",
        nim: "20210004",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
      },
      visi: "BEM FH UNISBA sebagai Pelopor Gerakan Mahasiswa yang Progresif dan Berkeadilan",
      misi: [
        "Memperkuat advokasi hak-hak mahasiswa",
        "Mengembangkan program kewirausahaan untuk mahasiswa hukum", 
        "Meningkatkan kualitas fasilitas akademik",
        "Membangun jaringan alumni yang solid"
      ],
      programs: [
        "Inkubator bisnis mahasiswa hukum",
        "Program beasiswa prestasi",
        "Festival seni budaya fakultas"
      ],
      experience: [
        "Wakil Ketua BEM periode sebelumnya",
        "Koordinator Divisi Advokasi 2023",
        "Juara 1 Lomba Karya Tulis Hukum 2022"
      ],
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      number: "03",
      ketua: {
        name: "Dian Sastika",
        nim: "20210005", 
        photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop"
      },
      wakil: {
        name: "Rio Pratama",
        nim: "20210006",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
      },
      visi: "Membangun Ekosistem Mahasiswa Hukum yang Kolaboratif dan Berdaya Saing Global",
      misi: [
        "Mengintegrasikan teknologi dalam kegiatan kemahasiswaan",
        "Memperluas jaringan internasional fakultas",
        "Meningkatkan partisipasi mahasiswa dalam penelitian hukum",
        "Mengembangkan program kepedulian sosial"
      ],
      programs: [
        "Digital law library",
        "International moot court competition", 
        "Program pengabdian masyarakat berkelanjutan"
      ],
      experience: [
        "Ketua Divisi Akademik BEM 2023",
        "Delegasi Indonesia di Model United Nations",
        "Peneliti junior di Pusat Studi Hukum"
      ],
      videoId: "dQw4w9WgXcQ"
    }
  ];

  const scrollToDetail = (candidateId: number) => {
    setSelectedCandidate(candidateId);
    const element = document.getElementById(`detail-${candidateId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                onClick={() => onNavigate('home')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Profil Pasangan Calon
            </motion.h1>
            <motion.p 
              className="text-gray-600 mt-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ketua dan Wakil Ketua BEM FH UNISBA 2025
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => onNavigate('login')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Login untuk Memilih
            </Button>
          </motion.div>
        </motion.div>

        {/* Card Paslon Berjejer */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {candidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 text-center">
                <div className="mb-6">
                  <Badge className="text-lg px-4 py-2 mb-4 bg-blue-600">
                    PASLON {candidate.number}
                  </Badge>
                </div>
                
                <div className="space-y-4 mb-6">
                  {/* Ketua */}
                  <div className="text-center">
                    <ImageWithFallback
                      src={candidate.ketua.photo}
                      alt={candidate.ketua.name}
                      className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                    />
                    <h3 className="font-semibold">{candidate.ketua.name}</h3>
                    <p className="text-sm text-gray-600">Calon Ketua</p>
                  </div>

                  {/* Wakil */}
                  <div className="text-center">
                    <ImageWithFallback
                      src={candidate.wakil.photo}
                      alt={candidate.wakil.name}
                      className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                    />
                    <h3 className="font-semibold">{candidate.wakil.name}</h3>
                    <p className="text-sm text-gray-600">Calon Wakil Ketua</p>
                  </div>
                </div>

                {/* Visi Singkat */}
                <div className="mb-6">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {candidate.visi}
                  </p>
                </div>

                {/* Tombol Selengkapnya */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline"
                    onClick={() => scrollToDetail(candidate.id)}
                    className="w-full"
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Selengkapnya
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Detail Section */}
        {selectedCandidate && (
          <motion.div
            id={`detail-${selectedCandidate}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            {candidates
              .filter(candidate => candidate.id === selectedCandidate)
              .map((candidate) => (
                <Card key={candidate.id} className="p-8">
                  <div className="text-center mb-8">
                    <Badge className="text-xl px-6 py-3 mb-4 bg-blue-600">
                      DETAIL PASLON {candidate.number}
                    </Badge>
                    <h2 className="text-2xl font-bold mb-2">
                      {candidate.ketua.name} & {candidate.wakil.name}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visi Misi */}
                    <div className="space-y-6">
                      {/* Visi */}
                      <div>
                        <div className="flex items-center mb-3">
                          <Target className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="text-xl font-semibold">Visi</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{candidate.visi}</p>
                      </div>

                      {/* Misi */}
                      <div>
                        <div className="flex items-center mb-3">
                          <Users className="w-5 h-5 text-green-600 mr-2" />
                          <h3 className="text-xl font-semibold">Misi</h3>
                        </div>
                        <ul className="space-y-2">
                          {candidate.misi.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Program dan Pengalaman */}
                    <div className="space-y-6">
                      {/* Program Unggulan */}
                      <div>
                        <div className="flex items-center mb-3">
                          <Award className="w-5 h-5 text-purple-600 mr-2" />
                          <h3 className="text-xl font-semibold">Program Unggulan</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {candidate.programs.map((program, index) => (
                            <Badge key={index} variant="secondary" className="px-3 py-1">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Pengalaman Organisasi */}
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Pengalaman Organisasi</h3>
                        <ul className="space-y-1">
                          {candidate.experience.map((exp, index) => (
                            <li key={index} className="text-gray-700 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                              {exp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Video Kampanye */}
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Video Kampanye</h3>
                        <div className="bg-gray-100 rounded-lg p-6 text-center">
                          <Play className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 mb-3">Video kampanye dari YouTube</p>
                          <Button variant="outline">
                            <Play className="w-4 h-4 mr-2" />
                            Tonton Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </motion.div>
        )}

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              onClick={() => onNavigate('login')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Login untuk Memilih Sekarang
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}