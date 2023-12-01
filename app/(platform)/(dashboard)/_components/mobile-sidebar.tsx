'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMobileSidebar } from '@/hooks/use-mobile-store';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { use, useEffect } from 'react';
import Sidebar from './sidebar';

export default function MobileSidebar() {
  const { isOpen, onClose, onOpen } = useMobileSidebar();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    onClose();
  }, [onClose, pathname]);
  if (!mounted) {
    return null;
  }

  return (
    <>
      <Button
        variant='ghost'
        className=' block md:hidden mr-2'
        onClick={onOpen}
      >
        <Menu className=' h-4 w-4' />
      </Button>
      <Sheet onOpenChange={onClose} open={isOpen}>
        <SheetContent className=' p-2 pt-10' side='left'>
          <Sidebar storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  );
}
