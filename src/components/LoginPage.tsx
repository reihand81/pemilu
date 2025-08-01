import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, Shield, Clock, Monitor } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [step, setStep] = useState<"nim" | "otp" | "closed">("nim");
  const [nim, setNim] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [error, setError] = useState("");
  const [isVotingTime] = useState(true); // Set to true during voting period

  const handleNimSubmit = () => {
    if (!nim.trim()) {
      setError("NIM harus diisi");
      return;
    }
    if (nim.length < 8) {
      setError("NIM tidak valid");
      return;
    }

    // Simulate sending OTP
    setError("");
    setStep("otp");

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStep("nim");
          setError("Kode OTP telah kedaluwarsa. Silakan coba lagi.");
          return 300;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpSubmit = () => {
    if (!otp.trim()) {
      setError("Kode OTP harus diisi");
      return;
    }
    if (otp.length !== 6) {
      setError("Kode OTP harus 6 digit");
      return;
    }

    // Simulate OTP verification
    if (otp === "123456") {
      onNavigate("verification");
    } else {
      setError("Kode OTP salah. Silakan coba lagi.");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!isVotingTime) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <Clock className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">
            Pemungutan Suara Belum Dimulai
          </h1>
          <p className="text-gray-600 mb-6">
            Pemungutan suara akan dibuka pada:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="font-semibold text-blue-800">15 Februari 2025</p>
            <p className="text-blue-600">Pukul 08.00 - 17.00 WIB</p>
          </div>
          <Button onClick={() => onNavigate("home")} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Button
          variant="outline"
          onClick={() => onNavigate("home")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Login Pemilih</h1>
            <p className="text-gray-600 mt-2">
              {step === "nim"
                ? "Masukkan NIM untuk memulai"
                : "Masukkan kode OTP dari email"}
            </p>
          </div>

          {step === "nim" && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="nim">Nomor Induk Mahasiswa (NIM)</Label>
                <Input
                  id="nim"
                  type="text"
                  placeholder="Contoh: 20210001"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="mt-2"
                />
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={handleNimSubmit} className="w-full">
                Kirim Kode OTP
              </Button>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Kode OTP telah dikirim ke email resmi Anda
                </p>
                <p className="text-sm font-medium text-blue-600">
                  Berlaku selama: {formatTime(countdown)}
                </p>
              </div>

              <div>
                <Label htmlFor="otp">Kode OTP (6 digit)</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="mt-2 text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={handleOtpSubmit} className="w-full">
                Masuk
              </Button>

              <Button
                variant="outline"
                onClick={() => setStep("nim")}
                className="w-full"
              >
                Kirim Ulang OTP
              </Button>
            </div>
          )}

          {/* Security Notes */}
          <div className="mt-8 space-y-3">
            <h3 className="font-semibold text-sm">Catatan Keamanan:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                <span>Login hanya bisa 1x per NIM</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                <span>Token OTP berlaku 5 menit</span>
              </div>
              <div className="flex items-center">
                <Monitor className="w-4 h-4 mr-2 text-blue-500" />
                <span>IP Address dan perangkat dicatat</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
