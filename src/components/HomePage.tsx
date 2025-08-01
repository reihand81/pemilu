import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Download, Shield, Users, Vote } from "lucide-react";
import { Countdown } from "./Countdown";
import { Roadmap } from "./Roadmap";
import { FAQ } from "./FAQ";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};


export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, #3B82F6 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, #8B5CF6 0%, transparent 50%)",
                "radial-gradient(circle at 40% 80%, #3B82F6 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="text-center relative z-10"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="flex justify-center mb-6"
              variants={fadeInUp}
            >
              <motion.div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Vote className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              variants={fadeInUp}
            >
              PEMILU KETUA BEM
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl mb-2"
              variants={fadeInUp}
            >
              FAKULTAS HUKUM
            </motion.h2>

            <motion.h3 className="text-xl md:text-2xl mb-8" variants={fadeInUp}>
              UNIVERSITAS ISLAM BANDUNG 2025
            </motion.h3>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => onNavigate("candidates")}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Lihat Paslon
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                  onClick={() => onNavigate("login")}
                >
                  <Vote className="w-5 h-5 mr-2" />
                  Login untuk Memilih
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Countdown Section */}
      <Countdown />

      {/* Quick Stats */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Users,
              count: "3",
              label: "Pasangan Calon",
              color: "text-blue-600",
            },
            {
              icon: Vote,
              count: "1,247",
              label: "Mahasiswa Terdaftar",
              color: "text-green-600",
            },
            {
              icon: Shield,
              count: "100%",
              label: "Keamanan Sistem",
              color: "text-purple-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                y: -5,
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 text-center cursor-pointer">
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <motion.h3
                  className="text-2xl font-semibold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stat.count}
                </motion.h3>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Roadmap Section */}
      <motion.div
        className="bg-white py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Roadmap />
      </motion.div>

      {/* Download Section */}
      <motion.div
        className="bg-gray-100 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            className="text-2xl font-semibold mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Unduh Dokumen Pemilu
          </motion.h2>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-6 max-w-md mx-auto">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-semibold mb-2">Tata Tertib Pemilu</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Panduan lengkap prosedur dan aturan pemilihan ketua BEM FH
                UNISBA 2025
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="bg-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <FAQ />
      </motion.div>

      {/* Disclaimer Section */}
      <motion.div
        className="bg-red-50 border-l-4 border-red-400 py-8"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start">
            <Shield className="w-8 h-8 text-red-500 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800 mb-2">
                PERINGATAN HUKUM
              </h3>
              <p className="text-red-700 text-sm leading-relaxed">
                <strong>Dilarang memalsukan data atau meretas sistem.</strong>{" "}
                Pelanggaran akan dikenai sanksi hukum sesuai UU ITE No. 11 Tahun
                2008 pasal 30 dan pasal 32 serta KUHP Pasal 263 tentang
                pemalsuan data. Setiap aktivitas login akan tercatat secara
                otomatis termasuk IP Address dan informasi perangkat.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
