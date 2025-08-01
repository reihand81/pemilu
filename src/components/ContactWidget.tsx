import { useState } from 'react';
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MessageCircle, Phone, Mail, X } from "lucide-react";

export function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Kontak Panitia</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Hotline Pemilu</p>
              <p className="text-sm text-gray-600">+62 812-3456-7890</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">Email Support</p>
              <p className="text-sm text-gray-600">pemilu.bem@fh.unisba.ac.id</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MessageCircle className="w-4 h-4 text-purple-600" />
            <div>
              <p className="text-sm font-medium">WhatsApp</p>
              <p className="text-sm text-gray-600">+62 812-3456-7891</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Jam operasional: 08.00 - 17.00 WIB
          </p>
        </div>
      </Card>
    </div>
  );
}