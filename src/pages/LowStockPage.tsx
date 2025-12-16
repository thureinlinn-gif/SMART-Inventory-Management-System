import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Package } from 'lucide-react';
import { inventoryStorage, InventoryItem } from '@/lib/inventoryStorage';
import { StockBadge } from '@/components/StockBadge';
import { Button } from '@/components/ui/button';
import { ItemModal } from '@/components/ItemModal';
import { toast } from 'sonner';

export default function LowStockPage() {
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    loadLowStockItems();
    const interval = setInterval(loadLowStockItems, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadLowStockItems = () => {
    const items = inventoryStorage.getItems();
    const lowStock = items.filter(item => item.quantity <= item.minQuantity);
    lowStock.sort((a, b) => a.quantity - b.quantity);
    setLowStockItems(lowStock);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (itemData: Omit<InventoryItem, 'id' | 'updatedAt'>) => {
    if (editingItem) {
      inventoryStorage.updateItem(editingItem.id, itemData);
      toast.success('Item updated successfully');
      loadLowStockItems();
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Low Stock Alerts</h1>
        <p className="text-muted-foreground">Items that need restocking</p>
      </div>

      {lowStockItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-success mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">All Stock Levels Healthy</h3>
            <p className="text-muted-foreground">No items require restocking at this time</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lowStockItems.map((item) => (
            <Card key={item.id} className="border-warning/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </div>
                  <StockBadge quantity={item.quantity} minQuantity={item.minQuantity} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-medium">{item.sku}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{item.location}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="font-bold text-warning">{item.quantity} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minimum:</span>
                    <span className="font-medium">{item.minQuantity} units</span>
                  </div>
                </div>
                <Button onClick={() => handleEdit(item)} className="w-full">
                  Restock Item
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ItemModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        item={editingItem}
      />
    </div>
  );
}
