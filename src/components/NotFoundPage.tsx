import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, Search, AlertTriangle } from "lucide-react";

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center">
        <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. 
          Mungkin halaman tersebut telah dipindahkan atau dihapus.
        </p>

        <div className="space-y-3">
          <Button 
            onClick={() => onNavigate('home')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onNavigate('candidates')}
            className="w-full"
          >
            <Search className="w-4 h-4 mr-2" />
            Lihat Profil Paslon
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Jika masalah berlanjut, hubungi panitia pemilu
          </p>
        </div>
      </Card>
    </div>
  );
}