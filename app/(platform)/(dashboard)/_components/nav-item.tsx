'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
export type Organization = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
};

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  onExpand: (id: string) => void;
  organization: Organization;
}

export default function NavItem({
  isActive,
  isExpanded,
  onExpand,
  organization,
}: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: 'Boards',
      icons: <Layout className=' w-5 h-5 mr-2' />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icons: <Activity className=' w-5 h-5 mr-2' />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icons: <Settings className=' w-5 h-5 mr-2' />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icons: <CreditCard className=' w-5 h-5 mr-2' />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem value={organization.id} className=' border-none'>
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          ' flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className=' flex items-center gap-x-2'>
          <div className=' w-7 h-7 relative'>
            <Image
              fill
              src={organization.imageUrl}
              alt='organization'
              className=' rounded-sm object-cover'
            />
          </div>
          <span className=' font-medium text-sm'>{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className=' pt-1 text-neutral-700'>
        {routes.map(({ label, icons, href }) => (
          <Button
            size='sm'
            key={href}
            onClick={() => onClick(href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb1',
              pathname === href && ' bg-sky-500/10 text-sky-700'
            )}
            variant='ghost'
          >
            {icons}
            {label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

NavItem.Skeleton = function NavItemSkeleton() {
  return (
    <div className=' flex items-center gap-x-2'>
      <div className=' w-10 h-10 relative shrink-0'>
        <Skeleton className=' h-full w-full absolute' />
      </div>
      <Skeleton className=' h-10 w-full' />
    </div>
  );
};
