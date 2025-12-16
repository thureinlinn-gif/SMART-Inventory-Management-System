import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InventoryItem } from '@/lib/inventoryStorage';

interface ItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: Omit<InventoryItem, 'id' | 'updatedAt'>) => void;
  item?: InventoryItem | null;
}

export const ItemModal = ({ open, onOpenChange, onSave, item }: ItemModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    quantity: 0,
    minQuantity: 0,
    location: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        sku: item.sku,
        quantity: item.quantity,
        minQuantity: item.minQuantity,
        location: item.location,
      });
    } else {
      setFormData({
        name: '',
        category: '',
        sku: '',
        quantity: 0,
        minQuantity: 0,
        location: '',
      });
    }
  }, [item, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            <DialogDescription>
              {item ? 'Update the item details below.' : 'Fill in the details for the new inventory item.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minQuantity">Min Quantity</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  min="0"
                  value={formData.minQuantity}
                  onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{item ? 'Save Changes' : 'Add Item'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
