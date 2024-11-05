import React, { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import QrScanner from "qr-scanner";

const ReadQr = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const videoRef = useRef(null); //video's component is stored as a reference to pass to qr-scanner
  const qrScannerRef = useRef(null);

  const startScanner = async () => {
    if (!videoRef.current) return;
    try {
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedData(result.data);
          stopScanner();
        },
        {
          preferredCamera: "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      await qrScannerRef.current.start();
      setIsScanning(true);
    } catch (error) {
      console.error("Scanner error:", error);
    }
  };

  const stopScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">QR Scanner</h2>
          <p className="text-gray-600">Scan any QR code to get started</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <button
            onClick={isScanning ? stopScanner : startScanner}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isScanning
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <Camera className="w-5 h-5" />
            {isScanning ? "Stop Scanner" : "Start Scanner"}
          </button>

          <div className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" />
            {!isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <p className="text-white text-sm">Camera inactive</p>
              </div>
            )}
          </div>

          {scannedData && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-1">
                Scanned Result
              </h3>
              <p className="text-gray-600 break-all">{scannedData}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadQr;
