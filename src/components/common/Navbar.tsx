'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Briefcase, Mail, Info, Home, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'About', href: '/about', icon: Info },
    { name: 'Works', href: '/works', icon: Briefcase },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  // Simplified version without conditional rendering
  return (
    <header className="fixed w-full z-50 bottom-6 left-0 right-0">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-full px-4 md:px-12 lg:px-24 xl:px-48">
        <Dock className="items-end pb-3 mx-auto backdrop-blur-md bg-light-bgSurface/30 dark:bg-dark-bgSurface/30 border border-light-border/50 dark:border-dark-border/50">
          <DockItem className="aspect-square bg-light-bgSurface/80 dark:bg-dark-bgSurface/80">
            <DockLabel className="md:top-[-20px] lg:top-[-15px] top-[-30px]">Home</DockLabel>
            <DockIcon>
              <Link 
                href="/?nav=1" 
                className="text-2xl font-bold text-light-textAccent dark:text-dark-textAccent font-heading flex items-center justify-center w-full h-full active:opacity-80 transition-all duration-200"
              >
                <Home size={24} />
              </Link>
            </DockIcon>
          </DockItem>
          
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href.includes('#') && pathname === '/');
            
            return (
              <DockItem 
                key={index}
                className="aspect-square bg-light-bgSurface/80 dark:bg-dark-bgSurface/80"
              >
                <DockLabel className="md:top-[-20px] lg:top-[-15px] top-[-30px]">{item.name}</DockLabel>
                <DockIcon>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center w-full h-full ${
                      isActive 
                        ? 'text-light-textAccent dark:text-dark-textAccent' 
                        : 'text-light-textPrimary dark:text-dark-textPrimary'
                    } active:opacity-80 transition-all duration-200`}
                  >
                    <Icon size={24} />
                  </Link>
                </DockIcon>
              </DockItem>
            );
          })}
          
          <DockItem 
            className="aspect-square bg-light-buttonPrimary/20 dark:bg-dark-buttonPrimary/20"
          >
            <DockLabel className="md:top-[-20px] lg:top-[-15px] top-[-30px]">Theme</DockLabel>
            <DockIcon>
              <button 
                className="flex items-center justify-center w-full h-full active:opacity-80 transition-all duration-200 cursor-pointer"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {/* Always render both icons, hide one with CSS based on theme */}
                <div className="relative w-6 h-6">
                  <Sun 
                    size={24} 
                    className={`absolute inset-0 text-light-textPrimary dark:text-dark-textPrimary transition-opacity duration-200 ${
                      theme === 'dark' ? 'opacity-100' : 'opacity-0'
                    }`} 
                  />
                  <Moon 
                    size={24} 
                    className={`absolute inset-0 text-light-textPrimary dark:text-dark-textPrimary transition-opacity duration-200 ${
                      theme === 'light' ? 'opacity-100' : 'opacity-0'
                    }`} 
                  />
                </div>
              </button>
            </DockIcon>
          </DockItem>
        </Dock>
      </div>
    </header>
  );
};

export default Navbar;