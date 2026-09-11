import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";


interface BarcodeScannerProps {
  open: boolean;
  onClose: () => void;
  onScanSuccess: (barcode: string) => void;
  onManualSearch?: () => void;
}

export function BarcodeScanner({
  open,
  onClose,
  onScanSuccess,
  onManualSearch,
}: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
    const [error, setError] = useState<string | null>(null);
  const containerId = "barcode-scanner-region";

  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        setError(null);
       

        await scanner.start(
          { facingMode: "environment" }, // kamera belakang
          {
            fps: 10,
            qrbox: { width: 280, height: 160 },
            aspectRatio: 1.5,
          },
          (decodedText) => {
            // Berhasil scan
            if (scanner.getState() === Html5QrcodeScannerState.SCANNING) {
              scanner.stop().catch(() => {});
              onScanSuccess(decodedText);
            }
          },
          () => {
            // error per frame diabaikan (normal)
          }
        );
      } catch (err: unknown) {
        if (!isMounted) return;
        console.error(err);

        const errorMessage =
          err instanceof Error
            ? err.message
            : typeof err === "object" && err && "message" in err
              ? String((err as { message?: unknown }).message ?? "")
              : "";

        setError(
          errorMessage.includes("Permission")
            ? "Izin kamera ditolak. Silakan izinkan akses kamera."
            : "Gagal mengakses kamera. Coba lagi atau gunakan pencarian manual."
        );
        // setScanning(false);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        const state = scannerRef.current.getState();
        if (
          state === Html5QrcodeScannerState.SCANNING ||
          state === Html5QrcodeScannerState.PAUSED
        ) {
          scannerRef.current.stop().catch(() => {});
        }
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [open, onScanSuccess]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <h2 className="text-lg font-semibold">Scan Barcode</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-white/10"
          aria-label="Tutup"
        >
          <X size={24} />
        </button>
      </div>

      {/* Scanner Area */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <div id={containerId} className="w-full max-w-md overflow-hidden rounded-xl" />

        {/* Overlay guide */}
        {!error && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-72 rounded-xl border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="space-y-3 bg-black px-4 py-5 text-center text-white">
        {error ? (
          <>
            <p className="text-sm text-red-300">{error}</p>
            <div className="flex justify-center gap-3">
              <Button variant="secondary" onClick={onClose}>
                Tutup
              </Button>
              {onManualSearch && (
                <Button
                  onClick={() => {
                    onClose();
                    onManualSearch();
                  }}
                >
                  <Search size={16} />
                  Cari Manual
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-white/80">
              Arahkan kamera ke barcode produk
            </p>
            {onManualSearch && (
              <Button
                variant="secondary"
                className="w-full max-w-xs"
                onClick={() => {
                  onClose();
                  onManualSearch();
                }}
              >
                <Search size={16} />
                Cari Manual
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}