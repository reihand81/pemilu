import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "./ui/sheet";
import { Menu, Settings } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'candidates', label: 'Profil Paslon' },
    { id: 'results', label: 'Hasil Sementara' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">UNISBA</h1>
              <p className="text-xs text-gray-600">Fakultas Hukum</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 text-sm transition-colors ${
                  currentPage === item.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Login Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              onClick={() => onNavigate('login')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Login untuk Memilih
            </Button>
            <Button 
              onClick={() => onNavigate('admin-login')}
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu Navigasi</SheetTitle>
                  <SheetDescription>
                    Pilih halaman yang ingin Anda kunjungi
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center space-x-3 pb-6 border-b">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">U</span>
                    </div>
                    <div>
                      <h2 className="font-semibold">UNISBA</h2>
                      <p className="text-xs text-gray-600">Fakultas Hukum</p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6">
                    <div className="space-y-2">
                      {navItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(item.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            currentPage === item.id
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Login Buttons */}
                  <div className="pt-6 border-t space-y-3">
                    <Button 
                      onClick={() => handleNavigate('login')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Login untuk Memilih
                    </Button>
                    <Button 
                      onClick={() => handleNavigate('admin-login')}
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Login Admin
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}