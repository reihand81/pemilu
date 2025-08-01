import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set tanggal pemilu (contoh: 15 Februari 2025)
    const electionDate = new Date('2025-02-15T08:00:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = electionDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: 'Hari' },
    { value: timeLeft.hours, label: 'Jam' },
    { value: timeLeft.minutes, label: 'Menit' },
    { value: timeLeft.seconds, label: 'Detik' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "linear-gradient(45deg, #3B82F6, #8B5CF6)",
            "linear-gradient(135deg, #8B5CF6, #3B82F6)",
            "linear-gradient(45deg, #3B82F6, #8B5CF6)"
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h2 
          className="text-2xl mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Countdown Hari Pemilu
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-4 gap-4 max-w-md mx-auto"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              className="bg-white/20 rounded-lg p-4 backdrop-blur-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * index,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.3)"
              }}
            >
              <motion.div 
                className="text-3xl font-bold"
                key={block.value} // Key change triggers animation
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {block.value}
              </motion.div>
              <div className="text-sm">{block.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}