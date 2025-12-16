import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StockBadgeProps {
  quantity: number;
  minQuantity: number;
}

export const StockBadge = ({ quantity, minQuantity }: StockBadgeProps) => {
  const getStockStatus = () => {
    if (quantity === 0) {
      return { label: 'Out of Stock', variant: 'destructive' as const };
    }
    if (quantity <= minQuantity) {
      return { label: 'Low Stock', variant: 'warning' as const };
    }
    if (quantity <= minQuantity * 1.5) {
      return { label: 'Medium Stock', variant: 'secondary' as const };
    }
    return { label: 'In Stock', variant: 'success' as const };
  };

  const status = getStockStatus();

  return (
    <Badge
      variant={status.variant}
      className={cn(
        'font-medium',
        status.variant === 'success' && 'bg-success text-success-foreground',
        status.variant === 'warning' && 'bg-warning text-warning-foreground'
      )}
    >
      {status.label}
    </Badge>
  );
};
