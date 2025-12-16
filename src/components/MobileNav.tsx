import { LayoutDashboard, Package, Camera, AlertTriangle } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Scanner', href: '/scanner', icon: Camera },
  { name: 'Low Stock', href: '/low-stock', icon: AlertTriangle },
];

export const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card lg:hidden">
      <nav className="flex items-center justify-around px-2 py-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
              'text-muted-foreground hover:text-foreground'
            )}
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
