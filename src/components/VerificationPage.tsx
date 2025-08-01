import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Shield, CheckCircle } from "lucide-react";

interface VerificationPageProps {
  onNavigate: (page: string) => void;
}

export function VerificationPage({ onNavigate }: VerificationPageProps) {
  const [agreements, setAgreements] = useState({
    rules: false,
    oneVote: false,
    noPressure: false
  });
  const [error, setError] = useState('');

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setError('');
  };

  const handleContinue = () => {
    if (!agreements.rules || !agreements.oneVote || !agreements.noPressure) {
      setError('Anda harus menyetujui semua pernyataan untuk melanjutkan');
      return;
    }
    onNavigate('voting');
  };

  const allAgreed = agreements.rules && agreements.oneVote && agreements.noPressure;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Verifikasi dan Persetujuan</h1>
          <p className="text-gray-600 mt-2">
            Pastikan Anda siap menggunakan hak suara dengan jujur dan bertanggung jawab
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-blue-800 mb-3">
            Apakah Anda siap menggunakan hak suara Anda dengan jujur dan bertanggung jawab?
          </h2>
          <p className="text-blue-700 text-sm">
            Dengan memberikan suara, Anda turut menentukan masa depan BEM Fakultas Hukum UNISBA. 
            Pastikan pilihan Anda dibuat dengan penuh kesadaran dan tanggung jawab.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="rules"
              checked={agreements.rules}
              onCheckedChange={() => handleAgreementChange('rules')}
              className="mt-1"
            />
            <div className="flex-1">
              <label 
                htmlFor="rules" 
                className="font-medium cursor-pointer flex items-center"
              >
                {agreements.rules && <CheckCircle className="w-4 h-4 text-green-500 mr-2" />}
                Saya bersedia mematuhi aturan
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Saya akan mengikuti seluruh prosedur pemilihan sesuai dengan tata tertib yang berlaku
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="oneVote"
              checked={agreements.oneVote}
              onCheckedChange={() => handleAgreementChange('oneVote')}
              className="mt-1"
            />
            <div className="flex-1">
              <label 
                htmlFor="oneVote" 
                className="font-medium cursor-pointer flex items-center"
              >
                {agreements.oneVote && <CheckCircle className="w-4 h-4 text-green-500 mr-2" />}
                Saya tidak akan memilih lebih dari satu kali
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Saya memahami bahwa setiap mahasiswa hanya memiliki satu hak suara dan tidak boleh memberikan suara ganda
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="noPressure"
              checked={agreements.noPressure}
              onCheckedChange={() => handleAgreementChange('noPressure')}
              className="mt-1"
            />
            <div className="flex-1">
              <label 
                htmlFor="noPressure" 
                className="font-medium cursor-pointer flex items-center"
              >
                {agreements.noPressure && <CheckCircle className="w-4 h-4 text-green-500 mr-2" />}
                Saya tidak berada di bawah tekanan dalam memilih
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Pilihan saya dibuat secara bebas tanpa paksaan, ancaman, atau imbalan dari pihak manapun
              </p>
            </div>
          </div>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Button 
            onClick={handleContinue}
            disabled={!allAgreed}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
          >
            {allAgreed ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Lanjutkan ke Pemungutan Suara
              </>
            ) : (
              'Setujui Semua Pernyataan untuk Lanjut'
            )}
          </Button>

          <Button 
            variant="outline" 
            onClick={() => onNavigate('candidates')} 
            className="w-full"
          >
            Lihat Profil Paslon Lagi
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Shield className="w-4 h-4 mr-2" />
            <span>Aktivitas Anda dalam sistem ini direkam untuk keamanan</span>
          </div>
        </div>
      </Card>
    </div>
  );
}