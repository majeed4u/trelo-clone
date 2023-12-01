import React from 'react';
import Sidebar from '../_components/sidebar';

export default function organizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=' pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto'>
      <div className=' flex gap-7'>
        {' '}
        <div className=' w-64 shrink-0 hidden md:block'>
          {/* sidebar */}
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
