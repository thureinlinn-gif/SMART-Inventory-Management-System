import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { inventoryStorage, InventoryItem } from '@/lib/inventoryStorage';
import { StockBadge } from '@/components/StockBadge';
import { Plus, Minus, Pencil, Camera, CameraOff } from 'lucide-react';
import { toast } from 'sonner';
import { ItemModal } from '@/components/ItemModal';

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scannedItem, setScannedItem] = useState<InventoryItem | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [scanner]);

  const startScanning = () => {
    const newScanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      },
      false
    );

    newScanner.render(
      (decodedText) => {
        const item = inventoryStorage.getItemBySku(decodedText);
        if (item) {
          setScannedItem(item);
          toast.success(`Found: ${item.name}`);
        } else {
          toast.error('Item not found. Try adding it manually.');
        }
        newScanner.clear().catch(console.error);
        setScanning(false);
      },
      (error) => {
        // Ignore scanning errors (happens constantly while scanning)
      }
    );

    setScanner(newScanner);
    setScanning(true);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear().catch(console.error);
      setScanning(false);
    }
  };

  const handleIncrement = () => {
    if (!scannedItem) return;
    const updated = inventoryStorage.incrementQuantity(scannedItem.id);
    if (updated) {
      setScannedItem(updated);
      toast.success('Quantity increased');
    }
  };

  const handleDecrement = () => {
    if (!scannedItem || scannedItem.quantity === 0) return;
    const updated = inventoryStorage.decrementQuantity(scannedItem.id);
    if (updated) {
      setScannedItem(updated);
      toast.success('Quantity decreased');
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = (itemData: Omit<InventoryItem, 'id' | 'updatedAt'>) => {
    if (scannedItem) {
      const updated = inventoryStorage.updateItem(scannedItem.id, itemData);
      if (updated) {
        setScannedItem(updated);
        toast.success('Item updated');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Barcode Scanner</h1>
        <p className="text-muted-foreground">Scan items to quickly update inventory</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Camera Scanner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              id="reader"
              className={`${scanning ? 'block' : 'hidden'} w-full rounded-lg overflow-hidden`}
            />
            {!scanning && (
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <div className="text-center">
                  <CameraOff className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Camera inactive</p>
                  <Button onClick={startScanning} size="lg">
                    <Camera className="mr-2 h-5 w-5" />
                    Start Scanner
                  </Button>
                </div>
              </div>
            )}
            {scanning && (
              <Button onClick={stopScanning} variant="destructive" className="w-full">
                Stop Scanning
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scanned Item</CardTitle>
          </CardHeader>
          <CardContent>
            {scannedItem ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{scannedItem.name}</h3>
                      <p className="text-sm text-muted-foreground">SKU: {scannedItem.sku}</p>
                    </div>
                    <StockBadge quantity={scannedItem.quantity} minQuantity={scannedItem.minQuantity} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{scannedItem.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{scannedItem.location}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Current Quantity</p>
                    <div className="flex items-center gap-4">
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={handleDecrement}
                        disabled={scannedItem.quantity === 0}
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <span className="text-4xl font-bold text-foreground min-w-[80px] text-center">
                        {scannedItem.quantity}
                      </span>
                      <Button size="lg" onClick={handleIncrement}>
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={handleEdit} variant="outline" className="w-full">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Item Details
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-center">
                <div>
                  <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Scan a barcode or QR code to get started
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {scannedItem && (
        <ItemModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSave={handleSave}
          item={scannedItem}
        />
      )}
    </div>
  );
}
