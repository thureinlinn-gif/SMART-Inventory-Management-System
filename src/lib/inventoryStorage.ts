export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  location: string;
  updatedAt: string;
}

const STORAGE_KEY = 'inventory_items';

export const inventoryStorage = {
  getItems: (): InventoryItem[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveItems: (items: InventoryItem[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  addItem: (item: Omit<InventoryItem, 'id' | 'updatedAt'>): InventoryItem => {
    const items = inventoryStorage.getItems();
    const newItem: InventoryItem = {
      ...item,
      id: crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    };
    items.push(newItem);
    inventoryStorage.saveItems(items);
    return newItem;
  },

  updateItem: (id: string, updates: Partial<InventoryItem>): InventoryItem | null => {
    const items = inventoryStorage.getItems();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    inventoryStorage.saveItems(items);
    return items[index];
  },

  deleteItem: (id: string): boolean => {
    const items = inventoryStorage.getItems();
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    inventoryStorage.saveItems(filtered);
    return true;
  },

  getItemBySku: (sku: string): InventoryItem | null => {
    const items = inventoryStorage.getItems();
    return items.find(item => item.sku.toLowerCase() === sku.toLowerCase()) || null;
  },

  incrementQuantity: (id: string, amount: number = 1): InventoryItem | null => {
    const items = inventoryStorage.getItems();
    const item = items.find(i => i.id === id);
    if (!item) return null;
    return inventoryStorage.updateItem(id, { quantity: item.quantity + amount });
  },

  decrementQuantity: (id: string, amount: number = 1): InventoryItem | null => {
    const items = inventoryStorage.getItems();
    const item = items.find(i => i.id === id);
    if (!item || item.quantity < amount) return null;
    return inventoryStorage.updateItem(id, { quantity: item.quantity - amount });
  },

  initializeSampleData: (): void => {
    const existing = inventoryStorage.getItems();
    if (existing.length > 0) return;

    const sampleItems: Omit<InventoryItem, 'id' | 'updatedAt'>[] = [
      { name: 'Laptop', category: 'Electronics', sku: 'LAP001', quantity: 15, minQuantity: 5, location: 'Shelf A1' },
      { name: 'Wireless Mouse', category: 'Electronics', sku: 'MOU001', quantity: 3, minQuantity: 10, location: 'Shelf A2' },
      { name: 'Office Chair', category: 'Furniture', sku: 'CHR001', quantity: 8, minQuantity: 5, location: 'Warehouse B' },
      { name: 'Printer Paper', category: 'Supplies', sku: 'PAP001', quantity: 50, minQuantity: 20, location: 'Storage C1' },
      { name: 'USB Cable', category: 'Electronics', sku: 'USB001', quantity: 2, minQuantity: 15, location: 'Shelf A3' },
    ];

    sampleItems.forEach(item => inventoryStorage.addItem(item));
  },
};
