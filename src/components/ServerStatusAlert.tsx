import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { X, Wifi, WifiOff } from "lucide-react";

export function ServerStatusAlert() {
  const [isServerDown, setIsServerDown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Simulate random server check (in real app, this would be actual server monitoring)
    const checkServer = () => {
      const isDown = Math.random() < 0.05; // 5% chance of showing server down alert
      if (isDown && !isServerDown) {
        setIsServerDown(true);
        setShowAlert(true);
      } else if (!isDown && isServerDown) {
        setIsServerDown(false);
        // Keep alert visible until user dismisses it
      }
    };

    const interval = setInterval(checkServer, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [isServerDown]);

  if (!showAlert) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <Alert className={`border ${isServerDown ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isServerDown ? (
              <WifiOff className="w-4 h-4 text-red-600 mr-2" />
            ) : (
              <Wifi className="w-4 h-4 text-green-600 mr-2" />
            )}
            <AlertDescription className={isServerDown ? 'text-red-700' : 'text-green-700'}>
              {isServerDown ? (
                <strong>Server mengalami gangguan. Tim teknis sedang memperbaiki.</strong>
              ) : (
                <strong>Server telah pulih. Sistem kembali normal.</strong>
              )}
            </AlertDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowAlert(false)}
            className="p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Alert>
    </div>
  );
}