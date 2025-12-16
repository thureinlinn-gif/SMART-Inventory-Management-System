# 📦 Smart Inventory Management System

A modern, real-time inventory management application with barcode/QR scanning capabilities, built with React and TypeScript.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Real-time overview of inventory stats, low stock alerts, and recent activity |
| 📋 **Inventory Management** | Full CRUD operations with search, filter, and sort capabilities |
| 📸 **Barcode Scanner** | Camera-based barcode/QR code scanning for quick item lookup |
| ⚠️ **Low Stock Alerts** | Automatic detection and display of items below minimum quantity |
| 📱 **Responsive Design** | Works seamlessly on desktop, tablet, and mobile devices |

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Routing:** React Router v6
- **State Management:** TanStack Query
- **Barcode Scanning:** html5-qrcode
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Access the Application

Once running, open your browser and navigate to:

```
http://localhost:8080
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── Navbar.tsx       # Top navigation bar
│   ├── Sidebar.tsx      # Desktop sidebar navigation
│   ├── MobileNav.tsx    # Mobile bottom navigation
│   ├── StockBadge.tsx   # Stock status indicator
│   └── ItemModal.tsx    # Add/Edit item modal
├── pages/
│   ├── Dashboard.tsx    # Main dashboard view
│   ├── InventoryPage.tsx # Inventory management
│   ├── ScannerPage.tsx  # Barcode scanner
│   └── LowStockPage.tsx # Low stock items view
├── lib/
│   ├── inventoryStorage.ts # Local storage management
│   └── utils.ts         # Utility functions
└── App.tsx              # Main application component
```

---

## 📖 Usage Guide

### Dashboard
View key metrics including total items, low stock count, and recent inventory changes.

### Inventory Management
- **Add Items:** Click the "Add Item" button to create new inventory entries
- **Edit Items:** Click the edit icon on any item row
- **Delete Items:** Click the trash icon to remove items
- **Search:** Use the search bar to find items by name or SKU
- **Filter:** Filter by category using the dropdown

### Barcode Scanner
1. Navigate to the Scanner page
2. Grant camera permissions when prompted
3. Point your camera at a barcode or QR code
4. The system will automatically look up the item by SKU
5. Quickly increment/decrement quantities or edit item details

### Low Stock Alerts
Items that fall at or below their minimum quantity threshold are automatically flagged and displayed on the Low Stock page.

---

## 📊 Data Schema

Each inventory item contains:

```typescript
interface InventoryItem {
  id: string;          // Unique identifier
  name: string;        // Item name
  category: string;    // Item category
  sku: string;         // Stock Keeping Unit
  quantity: number;    // Current quantity
  minQuantity: number; // Minimum threshold
  location: string;    // Storage location
  updatedAt: string;   // Last update timestamp
}
```

---

## 🎨 Stock Status Indicators

| Status | Color | Condition |
|--------|-------|-----------|
| 🟢 In Stock | Green | quantity > minQuantity |
| 🟡 Low Stock | Yellow | quantity = minQuantity |
| 🔴 Critical | Red | quantity < minQuantity |

---

## 📱 Camera Scanner Requirements

For the barcode scanner to work:
- Use HTTPS in production (or localhost for development)
- Grant camera permissions when prompted
- Ensure adequate lighting for best results
- Supported formats: QR Code, Code 128, Code 39, EAN-13, EAN-8, UPC-A, UPC-E

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🗄️ Data Persistence

Currently, all data is stored in the browser's **localStorage**. This means:
- ✅ Data persists across page refreshes
- ✅ No backend setup required
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Clearing browser data will reset inventory

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

