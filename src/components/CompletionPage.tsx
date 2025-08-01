import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, QrCode, BarChart3, Home, Download } from "lucide-react";

interface CompletionPageProps {
  onNavigate: (page: string) => void;
}

export function CompletionPage({ onNavigate }: CompletionPageProps) {
  const voteId = "VOTE-2025-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const timestamp = new Date().toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Confetti particles
  const confettiParticles = [...Array(20)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
    size: Math.random() * 10 + 5,
    delay: Math.random() * 2
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {confettiParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{ y: -100, rotate: 0, opacity: 1 }}
          animate={{ 
            y: window.innerHeight + 100, 
            rotate: 360,
            opacity: 0
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #10B981 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #3B82F6 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, #10B981 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ 
          duration: 1, 
          type: "spring", 
          stiffness: 100,
          delay: 0.5 
        }}
      >
        <Card className="max-w-lg w-full p-8 text-center relative z-10">
          <motion.div 
            className="mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div 
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold text-green-800 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2,
                type: "spring",
                stiffness: 200 
              }}
            >
              Terima Kasih!
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Hak suara Anda telah direkam dengan aman
            </motion.p>
          </motion.div>

          <motion.div 
            className="bg-gray-50 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <h3 className="font-semibold mb-4">Bukti Partisipasi</h3>
            
            {/* QR Code Placeholder */}
            <motion.div 
              className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.8,
                type: "spring",
                stiffness: 150
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <QrCode className="w-16 h-16 text-gray-400" />
            </motion.div>
            
            <motion.div 
              className="space-y-2 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                <strong>ID Suara:</strong> {voteId}
              </motion.p>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
              >
                <strong>Waktu:</strong> {timestamp}
              </motion.p>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.3 }}
              >
                <strong>Status:</strong> <span className="text-green-600 font-medium">Tercatat</span>
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="sm" className="mt-4">
                <Download className="w-4 h-4 mr-2" />
                Unduh Bukti
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.5 }}
          >
            <p className="text-sm text-blue-700">
              QR Code ini telah dikirim ke email resmi Anda sebagai bukti partisipasi. 
              <strong className="block mt-1">Kode ini TIDAK menunjukkan siapa yang Anda pilih.</strong>
            </p>
          </motion.div>

          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => onNavigate('results')}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Lihat Hasil Sementara
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                onClick={() => onNavigate('home')}
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 3 }}
          >
            <p className="text-xs text-gray-500">
              Pemilu BEM FH UNISBA 2025 • Sistem Pemungutan Suara Elektronik
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}