import { LayoutDashboard, Package, Camera, AlertTriangle } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Scanner', href: '/scanner', icon: Camera },
  { name: 'Low Stock', href: '/low-stock', icon: AlertTriangle },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-card lg:pt-16">
      <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto px-6 py-6">
        <nav className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
              activeClassName="bg-secondary text-foreground"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};
