'use client';

import { useOrganization } from '@clerk/nextjs';
import { CreditCard } from 'lucide-react';
import Image from 'next/image';

interface InfoProps {}
export default function Info() {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) {
    return <Info.Skeleton />;
  }
  return (
    <div className=' flex items-center gap-x-4'>
      <div className=' w-[60px] h-[60px] relative'>
        <Image
          src={organization?.imageUrl as string}
          width={500}
          height={500}
          alt='org'
          className=' rounded-md object-cover'
        />
      </div>
      <div className=' space-y-1'>
        <p className=' font-semibold text-xl'>{organization?.name!}</p>
        <div className=' flex items-center text-xs text-muted-foreground'>
          <CreditCard className='  w-4 h-4 mr-1' />
          Free
        </div>
      </div>
    </div>
  );
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className=' flex items-center gap-x-4'>
      <div className=' w-[60px] h-[60px] rounded-md bg-gray-200 animate-pulse'></div>
      <div className=' space-y-1'>
        <div className=' w-[200px] h-4 bg-gray-200 animate-pulse'></div>
        <div className=' w-[100px] h-4 bg-gray-200 animate-pulse'></div>
      </div>
    </div>
  );
};
