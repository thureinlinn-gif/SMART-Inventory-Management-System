import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingDown, AlertTriangle, Clock } from 'lucide-react';
import { inventoryStorage, InventoryItem } from '@/lib/inventoryStorage';
import { StockBadge } from '@/components/StockBadge';

export default function Dashboard() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
  });

  useEffect(() => {
    inventoryStorage.initializeSampleData();
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const data = inventoryStorage.getItems();
    setItems(data);
    setStats({
      totalItems: data.reduce((sum, item) => sum + item.quantity, 0),
      lowStockCount: data.filter(item => item.quantity > 0 && item.quantity <= item.minQuantity).length,
      outOfStockCount: data.filter(item => item.quantity === 0).length,
    });
  };

  const recentItems = items
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your inventory status</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.outOfStockCount}</div>
            <p className="text-xs text-muted-foreground">Urgent restocking</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No items yet</p>
            ) : (
              recentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      SKU: {item.sku} • {item.category} • {item.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{item.quantity}</p>
                      <p className="text-xs text-muted-foreground">units</p>
                    </div>
                    <StockBadge quantity={item.quantity} minQuantity={item.minQuantity} />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
