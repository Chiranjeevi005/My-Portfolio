# UI Components

This directory contains reusable UI components built with shadcn conventions.

## Dock Component

The Dock component is an Apple-style dock implementation with magnification effects on hover.

### Usage

```tsx
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { HomeIcon, Package } from 'lucide-react';

export function MyDock() {
  return (
    <Dock>
      <DockItem>
        <DockLabel>Home</DockLabel>
        <DockIcon>
          <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
        </DockIcon>
      </DockItem>
      <DockItem>
        <DockLabel>Products</DockLabel>
        <DockIcon>
          <Package className="h-full w-full text-neutral-600 dark:text-neutral-300" />
        </DockIcon>
      </DockItem>
    </Dock>
  );
}
```

### Props

#### Dock
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | DockItem components |
| className | string | - | Additional CSS classes |
| distance | number | 150 | Distance for magnification effect |
| panelHeight | number | 64 | Height of the dock panel |
| magnification | number | 80 | Magnification size |
| spring | SpringOptions | { mass: 0.1, stiffness: 150, damping: 12 } | Spring animation options |

#### DockItem
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | DockLabel and DockIcon components |
| className | string | - | Additional CSS classes |

#### DockLabel
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Label text |
| className | string | - | Additional CSS classes |

#### DockIcon
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Icon component (e.g., Lucide React icons) |
| className | string | - | Additional CSS classes |