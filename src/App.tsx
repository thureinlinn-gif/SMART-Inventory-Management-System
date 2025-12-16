import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import Index from "./pages/Index";
import InventoryPage from "./pages/InventoryPage";
import ScannerPage from "./pages/ScannerPage";
import LowStockPage from "./pages/LowStockPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Force rebuild to clear cache

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Sidebar />
          <main className="lg:pl-64 pb-16 lg:pb-0">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/scanner" element={<ScannerPage />} />
                <Route path="/low-stock" element={<LowStockPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
          <MobileNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
