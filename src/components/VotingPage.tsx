import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Vote, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface VotingPageProps {
  onNavigate: (page: string) => void;
}

export function VotingPage({ onNavigate }: VotingPageProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const candidates = [
    {
      id: 1,
      number: "01",
      ketua: "Ahmad Fauzan",
      wakil: "Siti Nurhaliza",
      ketuaPhoto:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      wakilPhoto:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      number: "02",
      ketua: "Budi Santoso",
      wakil: "Rina Permata",
      ketuaPhoto:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      wakilPhoto:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      number: "03",
      ketua: "Dian Sastika",
      wakil: "Rio Pratama",
      ketuaPhoto:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop",
      wakilPhoto:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    },
  ];

  const handleVote = (candidateId: number) => {
    setSelectedCandidate(candidateId);
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    // Process vote
    onNavigate("completion");
  };

  const selectedCandidateData = candidates.find(
    (c) => c.id === selectedCandidate
  );

  if (showConfirmation && selectedCandidateData) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <Card className="max-w-md w-full p-8 text-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            </motion.div>

            <motion.h1
              className="text-2xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Konfirmasi Pilihan
            </motion.h1>

            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Badge className="text-lg px-4 py-2 mb-4 bg-blue-600">
                  PASLON {selectedCandidateData.number}
                </Badge>
              </motion.div>

              <div className="flex justify-center space-x-4 mb-4">
                <motion.div
                  className="text-center"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={selectedCandidateData.ketuaPhoto}
                      alt={selectedCandidateData.ketua}
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                    />
                  </motion.div>
                  <p className="text-sm font-medium">
                    {selectedCandidateData.ketua}
                  </p>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={selectedCandidateData.wakilPhoto}
                      alt={selectedCandidateData.wakil}
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                    />
                  </motion.div>
                  <p className="text-sm font-medium">
                    {selectedCandidateData.wakil}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Alert className="border-orange-200 bg-orange-50 mb-6">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                  <strong>
                    Apakah Anda yakin memilih Paslon No.{" "}
                    {selectedCandidateData.number}?
                  </strong>
                  <br />
                  Pilihan tidak dapat diubah setelah dikonfirmasi.
                </AlertDescription>
              </Alert>
            </motion.div>

            <motion.div
              className="space-y-3"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={confirmVote}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Ya, Pilih Sekarang
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  className="w-full"
                >
                  Batal
                </Button>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div>
            <Vote className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold">Pemungutan Suara</h1>
          <p className="text-gray-600 mt-2">
            Pilih satu pasangan calon yang Anda dukung
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Alert className="border-blue-200 bg-blue-50 mb-8 max-w-2xl mx-auto">
            <Vote className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>Petunjuk:</strong> Klik tombol "PILIH" di bawah pasangan
              calon yang Anda dukung. Pastikan pilihan Anda sudah tepat karena
              tidak dapat diubah setelah dikonfirmasi.
            </AlertDescription>
          </Alert>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                  rotateX: -30,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                  },
                },
              }}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge className="text-lg px-4 py-2 mb-6 bg-blue-600">
                    PASLON {candidate.number}
                  </Badge>
                </motion.div>

                <div className="space-y-6 mb-8">
                  {/* Ketua */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={candidate.ketuaPhoto}
                        alt={candidate.ketua}
                        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                      />
                    </motion.div>
                    <h3 className="font-semibold text-lg">{candidate.ketua}</h3>
                    <p className="text-gray-600">Calon Ketua</p>
                  </motion.div>

                  {/* Wakil */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={candidate.wakilPhoto}
                        alt={candidate.wakil}
                        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                      />
                    </motion.div>
                    <h3 className="font-semibold text-lg">{candidate.wakil}</h3>
                    <p className="text-gray-600">Calon Wakil Ketua</p>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <Button
                    onClick={() => handleVote(candidate.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  >
                    <Vote className="w-5 h-5 mr-2" />
                    PILIH
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => onNavigate("candidates")}
              className="mr-4"
            >
              <Users className="w-4 h-4 mr-2" />
              Ragu-ragu? Lihat Profil Paslon
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
